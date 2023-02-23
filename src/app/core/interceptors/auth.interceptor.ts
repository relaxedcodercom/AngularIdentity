import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { ProgressService } from 'src/app/shared/progress';
import { AuthenticationService, UserPersistenceService } from '../services';
import { TokenModel, User } from '../models';
import { endpoints } from '@environments/endpoints';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );

    constructor(
        private userPersistenceService: UserPersistenceService,
        private authenticationService: AuthenticationService,
        private progressService: ProgressService
    ) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.progressService.start();
        const currentUser = this.userPersistenceService.getUser();
        if (currentUser) {
            request = this.addHeaders(request, currentUser);
        }

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (
                    err instanceof HttpErrorResponse && err.status === 401
                ) {
                    return this.handle401Error(request, next);
                } else {
                    return throwError(() => err);
                }
            }),
            finalize(() => this.progressService.complete())
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        const currentUser = this.userPersistenceService.getUser() ?? new User();
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authenticationService
                .refreshToken(
                    new TokenModel(currentUser.token, currentUser.refreshToken, currentUser.ipAddress)
                )
                .pipe(
                    switchMap((tokenModel: TokenModel) => {
                        this.isRefreshing = false;
                        currentUser.token = tokenModel.token;
                        currentUser.refreshToken = tokenModel.refreshToken;
                        this.userPersistenceService.setUser(currentUser);
                        this.refreshTokenSubject.next(tokenModel.token);
                        if (request.url.indexOf(endpoints.auth.logout) >= 0 && request.body instanceof TokenModel) {
                            return next.handle(this.addHeaders(this.handleLogout(request, tokenModel), currentUser));
                        }
                        return next.handle(this.addHeaders(request, currentUser));
                    })
                );
        } else {
            return this.refreshTokenSubject.pipe(
                filter((token) => token != null),
                take(1),
                switchMap((jwt) => {
                    return next.handle(this.addHeaders(request, jwt));
                })
            );
        }
    }

    private handleLogout(request: HttpRequest<any>, tokenModel: TokenModel) {
        var logoutTokenModel = request.body as TokenModel;
        logoutTokenModel.refreshToken = tokenModel.refreshToken;
        var newRequest = request.clone({
            body: logoutTokenModel
        });
        return newRequest;
    }

    private addHeaders(request: HttpRequest<any>, user: User) {
        if (request.url.indexOf(endpoints.auth.refreshToken) >= 0) {
            return request.clone();
        }
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${user.token}`
            },
        });
    }
}
