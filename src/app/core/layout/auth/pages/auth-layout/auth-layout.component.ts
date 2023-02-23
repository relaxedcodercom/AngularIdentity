import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {

  constructor(@Inject(DOCUMENT) private document: Document,) {
    this.document.body.classList.remove('dark-theme');

    // this.document.body.classList.add('dark-theme');
  }
}
