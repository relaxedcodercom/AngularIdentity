import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "@shared/material.module";
import { ProgressBarComponent } from "./components";

@NgModule({
    providers: [],
    declarations: [ProgressBarComponent],
    imports: [CommonModule, MaterialModule,],
    exports: [CommonModule, ProgressBarComponent],
})
export class ProgressModule { }