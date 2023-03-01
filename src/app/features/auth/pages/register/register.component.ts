import { RegisterUser } from '@core/models';
import { AuthenticationService } from '@core/services';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@shared/alert';
import { environment } from '@environments/environment';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public form: FormGroup;
  public recaptchaSiteKey = environment.recaptchaSiteKey;
  public theme: ReCaptchaV2.Theme = 'light';
  @ViewChild('captchaElem', { static: false }) captchaElem: RecaptchaComponent;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService,
    private router: Router, private alertService: AlertService) {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      username: this.fb.control(
        '',
        [Validators.required]
      ),
      email: this.fb.control(
        '',
        [Validators.required, Validators.email]
      ),
      password: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]],
      recaptcha: ['', [Validators.required]]
    });
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.form.controls['password'].value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  save() {
    if (this.form.invalid) {
      return;
    }

    var registerUser = new RegisterUser();
    registerUser = {
      ...registerUser,
      ...this.form.value,
    };

    this.authenticationService
      .register(registerUser)
      .subscribe(
        {
          complete: () => {
            this.alertService.success('User created successfully. Redirecting to login...');
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 3000);
          },
          error: () => {
            this.captchaElem.reset();
            this.form.controls['recaptcha'].markAsUntouched();
          }
        }
      );
  }
}
