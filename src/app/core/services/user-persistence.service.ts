import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class UserPersistenceService {
  user?: User;
  @Output() changeUser: EventEmitter<User> = new EventEmitter();

  constructor() { }

  public getUser(): User | undefined {
    var sessionUser = sessionStorage.getItem('user');
    if (sessionUser && sessionUser != null) {
      this.user = JSON.parse(sessionUser);
    } else {
      this.user = undefined;
    }

    return this.user;
  }

  public setUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));

    this.user = user;

    this.changeUser.emit(this.user);
  }

  public removeUser() {
    sessionStorage.removeItem('user');
    this.user = undefined;
  }
}
