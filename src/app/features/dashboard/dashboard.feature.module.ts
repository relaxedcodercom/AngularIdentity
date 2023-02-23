import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/index";
import { DashboardRoutingFeatureModule } from './dashboard-routing.feature.module';
import { DashboardComponent } from './pages';

@NgModule({
    providers: [],
    imports: [SharedModule, DashboardRoutingFeatureModule],
    declarations: [DashboardComponent],
})
export class DashboardFeatureModule { }