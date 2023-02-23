import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages";

const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DashboardRoutingFeatureModule {}