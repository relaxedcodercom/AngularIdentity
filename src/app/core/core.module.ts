import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared";
import { AuthGuard } from "./guards";
import { AuthInterceptor, ErrorInterceptor } from "./interceptors";
import { LayoutModule } from "./layout/layout.module";

@NgModule({
    declarations: [],
    providers: [AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    imports: [SharedModule, LayoutModule],
    exports: [LayoutModule],
})
export class CoreModule { }