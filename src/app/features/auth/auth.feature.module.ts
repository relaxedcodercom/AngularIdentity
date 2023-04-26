import { environment } from './../../../environments/environment';
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/index";
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from "ng-recaptcha";
import { AuthRoutingFeatureModule } from "./auth-routing.feature.module";
import { LoginComponent, RegisterComponent } from "./pages";

@NgModule({
    imports: [SharedModule, AuthRoutingFeatureModule, RecaptchaModule, RecaptchaFormsModule, RecaptchaV3Module],
    providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptchaV3SiteKey }],
    declarations: [
        RegisterComponent, LoginComponent
    ],
})
export class AuthFeatureModule { }