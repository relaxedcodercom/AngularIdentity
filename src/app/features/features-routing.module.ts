import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards';
import { AuthLayoutComponent, ErrorLayoutComponent, MainLayoutComponent } from '@core/layout';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: '',
                loadChildren: () =>
                    import('./dashboard/dashboard.feature.module').then(
                        (m) => m.DashboardFeatureModule
                    ),
            },
        ],
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./auth/auth.feature.module').then(
                        (m) => m.AuthFeatureModule
                    ),
            },
        ],
    },
    {
        path: 'error',
        component: ErrorLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./errors/errors.feature.module').then(
                        (m) => m.ErrorsFeatureModule
                    ),
            },
        ],
    },
    { path: '**', redirectTo: 'error/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class FeaturesRoutingModule { }