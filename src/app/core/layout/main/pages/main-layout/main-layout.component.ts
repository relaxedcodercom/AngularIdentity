import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  opened = true;
  over: MatDrawerMode = 'side' as MatDrawerMode;

  constructor(private deviceService: DeviceDetectorService) {
    this.handleNavigation();
  }

  handleNavigation() {
    if (this.deviceService.isDesktop()) {
      this.over = 'side';
    }
    else {
      this.opened = false;
      this.over = 'over';
    }
  }
}
