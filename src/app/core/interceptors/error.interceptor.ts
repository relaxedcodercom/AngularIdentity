import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserPersistenceService } from "@core/services";
import { AlertService } from "@shared/alert";
import { ProgressService } from "@shared/progress";
import { catchError, finalize, Observable, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private progressService: ProgressService,
        private alertService: AlertService,
        private userPersistenceService: UserPersistenceService,
        private router: Router
    ) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.progressService.start();

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err instanceof HttpErrorResponse && err.status === 403) {
                    if (err.status === 403) {
                        this.router.navigate(['error/access-denied']);
                        return throwError(() => err);
                    } else if (err.status === 500 || err.status === 400) {
                        const error = err.error.message || err.statusText;
                        this.alertService.error(error);
                        return throwError(() => err);
                    } else {
                        return throwError(() => err);
                    }
                }
                else if (err instanceof HttpErrorResponse && err.status === 400) {
                    let error = err.error.message || err.statusText;
                    this.alertService.error(error);
                    if (error == 'Refresh token is invalid!') {
                        err.error.message += ' Logging out...';
                        setTimeout(() => {
                            this.userPersistenceService.removeUser();
                            this.router.navigate(['/auth/login']);
                        }, 3000);
                    }
                    return throwError(() => err);
                }
                else {
                    let error =
                        (err.error ? err.error.message : err.message) || err.statusText;
                    if (err.status === 0) {
                        error = 'Unable to connect to server! Please try again.';
                    }
                    this.alertService.error(error);
                    return throwError(() => error);
                }
            }),
            finalize(() => this.progressService.complete())
        );
    }
}
