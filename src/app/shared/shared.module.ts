import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlertModule } from "./alert";
import { MaterialModule } from "./material.module";
import { ProgressModule } from "./progress";

@NgModule({
    providers: [],
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule,
        ProgressModule,
        AlertModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule,
        ProgressModule,
        AlertModule
    ],
})
export class SharedModule { }