import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials, RegisterUser, TokenModel } from '@core/models';
import { endpoints, environment } from '@environments/index';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login(loginCredentials: LoginCredentials) {
    return this.http.post<any>(
      `${environment.apiUrl}/${endpoints.auth.main}/${endpoints.auth.authenticate}`,
      loginCredentials
    );
  }

  public register(entity: RegisterUser) {
    return this.http.post(
      `${environment.apiUrl}/${endpoints.auth.main}/${endpoints.auth.register}`,
      entity
    );
  }

  public refreshToken(tokenModel: TokenModel) {
    return this.http.post<TokenModel>(
      `${environment.apiUrl}/${endpoints.auth.main}/${endpoints.auth.refreshToken}`,
      tokenModel
    );
  }

  public logout(tokenModel: TokenModel) {
    return this.http.post<string>(
      `${environment.apiUrl}/${endpoints.auth.main}/${endpoints.auth.logout}`,
      tokenModel
    );
  }

  public logoutEverywhere() {
    return this.http.post<string>(
      `${environment.apiUrl}/${endpoints.auth.main}/${endpoints.auth.logoutEverywhere}`,
      undefined
    );
  }
}
