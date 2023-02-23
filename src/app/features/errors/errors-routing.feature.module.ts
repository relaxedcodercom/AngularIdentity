import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorAccessDeniedComponent, ErrorNotFoundComponent } from "./pages";

const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {
        path: 'access-denied',
        component: ErrorAccessDeniedComponent,
    },
    {
        path: 'not-found',
        component: ErrorNotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ErrorsRoutingFeatureModule { }