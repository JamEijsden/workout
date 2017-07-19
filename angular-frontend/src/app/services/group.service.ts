import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {MdSnackBar} from '@angular/material';
import {CookieService} from './cookie.service';
import {Group} from '../classes/group';

@Injectable()
export class GroupService {
  url = 'http://localhost:8080/api';
  constructor(private  http: Http, private cookies: CookieService) {


  }

  getSchemaGroups(sid) {
    const access_token = localStorage.getItem('access_token')
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    return this.http
      .get(this.url + '/schema/groups/' + sid, {
        headers: headers
      })
      .map(response => response.json() as Group[]);
  }

  // Simulate GET /users
 addGroup(groupName, sId) {
    const group = new Group();
    const access_token = localStorage.getItem('access_token')
    group.name = groupName;

    const data = {
      schemaId: sId,
      group: group
    };
    console.log(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    return this.http
      .post(this.url + '/group/add',
        JSON.stringify(data), {
          headers: headers
        })
      .map(response => response.json() as Group);
  }

  // Simulate GET /users/:id
  getUserById(id: number) {
  }




}
