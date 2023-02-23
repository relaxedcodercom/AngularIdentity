import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/index";
import { AuthRoutingFeatureModule } from "./auth-routing.feature.module";
import { LoginComponent, RegisterComponent } from "./pages";

@NgModule({
    imports: [SharedModule, AuthRoutingFeatureModule],
    declarations: [
        RegisterComponent, LoginComponent
    ],
})
export class AuthFeatureModule { }