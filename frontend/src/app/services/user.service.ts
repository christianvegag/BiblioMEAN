import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: string;
  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }

  registerUser(user: any) {
    return this._http.post<any>(this.env + 'user/registerUser', user);
  }
  login(user: any) {
    return this._http.post<any>(this.env + 'user/login', user);
  }
  loggedIn() {
    //devuelve true o false
    return !!localStorage.getItem('token'); //true o false
  }

  getToken() {
    // devuelve el token
    return localStorage.getItem('token');
  }

  logout() {
    return localStorage.removeItem('token');
  }
}
