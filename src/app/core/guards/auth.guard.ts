import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserPersistenceService } from "@core/services";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userPersistenceService: UserPersistenceService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.userPersistenceService.getUser()) {
            return true;
        }

        this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: state.url },
        });
        return false;
    }
}
