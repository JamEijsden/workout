import { Injectable } from '@angular/core';
import {User} from '../classes/user';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {MdSnackBar} from '@angular/material';
import {CookieService} from './cookie.service';

@Injectable()
export class UserDataService {
  url = 'http://localhost:8080/api';
  constructor(private  http: Http, private cookies: CookieService) {


  }

  // Simulate POST /users
  addUser() {

    const user = new User();
    const access_token = localStorage.getItem('access_token');

    user.firstname = localStorage.getItem('firstname');
    user.lastname = localStorage.getItem('lastname');
    user.email = localStorage.getItem('email');
    let options: RequestOptions;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    options = new RequestOptions({headers: headers});

    return this.http
      .post(this.url + '/user',
        JSON.stringify(user), {
          headers: headers
        })
      .map(response => response.json() as User);

  }

  // Simulate DELETE /users/:id
  deleteUserById(id: number): UserDataService {
    return this;
  }

  // Simulate PUT /users/:id
  updateUserById(id: number, values: Object = {}) {
    const user = this.getUserById(id);
    if (!user) {
      return null;
    }
    Object.assign(user, values);

  }

  // Simulate GET /users
  getAllUsers() {
    let options: RequestOptions;
    const headers = new Headers();
    const access_token = localStorage.getItem('access_token');
    headers.append('Authorization', 'Bearer ' + access_token);
    options = new RequestOptions({headers: headers});
    return this.http
      .get(this.url + '/user/all', {
          headers: headers
        })
      .map(response => response.json() as User[])
  }

  // Simulate GET /users/:id
  getUserById(id: number) {
  }




}
