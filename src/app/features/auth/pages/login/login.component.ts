import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, IpService, UserPersistenceService } from '@core/services';
import { LoginCredentials, User } from '@core/models';
import { environment } from '@environments/environment';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public recaptchaSiteKey = environment.recaptchaSiteKey;
  public theme: ReCaptchaV2.Theme = 'light';
  private returnUrl: string;
  private ipAddress: string;
  @ViewChild('captchaElem', { static: false }) captchaElem: RecaptchaComponent;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private authenticationService: AuthenticationService, private router: Router,
    private userPersistenceService: UserPersistenceService, private ipService: IpService) {
    this.initializeForm();
    this.setIpAddress();
  }

  private setIpAddress() {
    this.ipService.getIPAddress().subscribe((result: any) => {
      this.ipAddress = result.ip;
    })
  }

  private initializeForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    var loginCredentials = new LoginCredentials();
    loginCredentials = {
      ...loginCredentials,
      ...this.form.value,
    };
    loginCredentials.ipAddress = this.ipAddress;

    this.authenticationService
      .login(loginCredentials)
      .subscribe(
        {
          next: (user: User) => {
            user.ipAddress = this.ipAddress;
            this.userPersistenceService.setUser(user);
            this.router.navigate([this.returnUrl]);
          },
          error: () => {
            this.captchaElem.reset();
            this.form.controls['recaptcha'].markAsUntouched();
          }
        }
      );
  }
}
