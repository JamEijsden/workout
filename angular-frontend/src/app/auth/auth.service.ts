import { Injectable } from '@angular/core';
import { GLOBAL } from '../global.variables';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UserDataService} from '../services/user-data.service';
import {CookieService} from '../services/cookie.service';
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {
  redirectUrl = '';
  picture: Subject<string> = new Subject<string>();
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://jameijsden.eu.auth0.com/api/v2/`,
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  });

  constructor(public router: Router, private http: Http, private userService: UserDataService, private cookies: CookieService) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['home']);
      } else if (err) {
        this.router.navigate(['login']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 3600) + new Date().getTime());

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('firstname', authResult.idTokenPayload.given_name);
    localStorage.setItem('lastname', authResult.idTokenPayload.family_name);
    localStorage.setItem('email', authResult.idTokenPayload.email);
    localStorage.setItem('picture', authResult.idTokenPayload.picture);
    this.picture.next(authResult.idTokenPayload.picture);

    this.userService.addUser()
      .subscribe(data => {
        console.log(data);
        localStorage.setItem('user_id', data.id.toString());
        localStorage.setItem('SESSIONID', authResult.accessToken + '.' + data.id.toString());
        this.router.navigate(['']);
    }, error => {
        console.log(JSON.stringify(error.json()));
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('email');
    localStorage.removeItem('picture');
    localStorage.removeItem('SESSIONID');
    // Go back to the home route
    this.router.navigate(['login']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return (localStorage.getItem('access_token') != null && localStorage.getItem('SESSIONID') != null);
    //const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    //return new Date().getTime() < expiresAt;
  }

  public getUser() {
    return localStorage.getItem('user');
  }

}
