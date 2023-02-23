import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) { }

  success(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'bottom',
    });
  }

  error(message: string) {
    if (message == '[object Object]') {
      this.snackBar.open('Something went wrong! Please try again!', 'X', {
        duration: 10000,
        panelClass: ['snackbar-error'],
        verticalPosition: 'bottom',
      });
    } else {
      this.snackBar.open(message, 'X', {
        duration: 60000,
        panelClass: ['snackbar-error'],
        verticalPosition: 'bottom',
      });
    }
  }
}
