import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/index";
import { ErrorsRoutingFeatureModule } from "./errors-routing.feature.module";
import { ErrorAccessDeniedComponent, ErrorNotFoundComponent } from "./pages";

@NgModule({
    imports: [SharedModule, ErrorsRoutingFeatureModule],
    declarations: [ErrorNotFoundComponent, ErrorAccessDeniedComponent],
})
export class ErrorsFeatureModule { }