import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/index";
import { RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";
import { AuthRoutingFeatureModule } from "./auth-routing.feature.module";
import { LoginComponent, RegisterComponent } from "./pages";

@NgModule({
    imports: [SharedModule, AuthRoutingFeatureModule, RecaptchaModule, RecaptchaFormsModule],
    declarations: [
        RegisterComponent, LoginComponent
    ],
})
export class AuthFeatureModule { }