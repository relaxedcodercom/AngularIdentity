import { Component, Input } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ProgressService } from '@shared/progress/services';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() mode: ProgressBarMode;
  show: boolean;

  constructor(progressService: ProgressService) {
    progressService.startProgress.subscribe(() => {
      this.show = true;
    });
    progressService.completeProgress.subscribe(() => {
      this.show = false;
    });
  }
}
