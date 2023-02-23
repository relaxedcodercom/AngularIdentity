import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  started = false;

  @Output() startProgress: EventEmitter<boolean> = new EventEmitter();
  @Output() completeProgress: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  start() {
    this.started = true;

    this.startProgress.emit(this.started);
  }

  complete() {
    this.started = false;

    this.completeProgress.emit(this.started);
  }
}
