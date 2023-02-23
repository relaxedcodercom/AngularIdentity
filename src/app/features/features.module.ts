import { NgModule } from "@angular/core";
import { SharedModule } from '../shared';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
    imports: [SharedModule, FeaturesRoutingModule],
    declarations: [],
})
export class FeaturesModule { }