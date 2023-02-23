import { ErrorLayoutComponent } from './main/pages/error-layout/error-layout.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/index';
import { AuthLayoutComponent } from './auth';
import { MainLayoutComponent, HeaderComponent, SidenavComponent } from './main';



@NgModule({
  declarations: [AuthLayoutComponent, MainLayoutComponent, ErrorLayoutComponent, HeaderComponent, SidenavComponent],
  imports: [
    SharedModule
  ]
})
export class LayoutModule { }