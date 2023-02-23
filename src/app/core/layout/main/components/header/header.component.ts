import { Router } from '@angular/router';
import { UserPersistenceService } from '@core/services';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthenticationService } from '@core/services';
import { TokenModel } from '@core/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() showSidenavToggle = true;

  constructor(private authenticationService: AuthenticationService, private userPersistenceService: UserPersistenceService,
    private router: Router) {
  }

  public logout() {
    var user = this.userPersistenceService.getUser();
    if (user != undefined) {
      this.authenticationService.logout(new TokenModel(user.token, user.refreshToken, user.ipAddress)).subscribe(() => {
        this.userPersistenceService.removeUser();
        this.router.navigateByUrl('/auth/login');
      }
      );
    }
  }

  public logoutEverywhere() {
    this.authenticationService.logoutEverywhere().subscribe(() => {
      this.userPersistenceService.removeUser();
      this.router.navigateByUrl('/auth/login');
    }
    );
  }
}
