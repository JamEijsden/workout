import { Injectable } from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Schema} from '../classes/schema';
import {CookieService} from "app/services/cookie.service";


@Injectable()
export class SchemaDataService {
  url = 'http://localhost:8080/api';
  constructor(private  http: Http,  public snackBar: MdSnackBar, private cookies: CookieService) {

  }
  addSchema(values) {

    const schema = new Schema();
    const access_token = localStorage.getItem('access_token')
    schema.name = values.name;
    schema.description = values.description;
    const data = {
      userId: localStorage.getItem('user_id'),
      schema: schema
    };
    console.log(data);
    let options: RequestOptions;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    options = new RequestOptions({headers: headers});
    return this.http
      .post(this.url + '/schema/add',
        JSON.stringify(data), {
          headers: headers
        })
      .map(response => response.json() as Schema);

  }

  editSchema(schema: Schema) {
    const access_token = localStorage.getItem('access_token')
    const data = {
      userId: localStorage.getItem('user_id'),
      schema: schema
    };
    let options: RequestOptions;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    options = new RequestOptions({headers: headers});
    return this.http
      .post(this.url + '/schema/add',
        JSON.stringify(data), {
          headers: headers
        })
      .map(response => response.json() as Schema);

  }

  getCurrentUserSchemas() {
    let options: RequestOptions;
    const access_token = localStorage.getItem('access_token')
    const user_id = localStorage.getItem('user_id');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    options = new RequestOptions({headers: headers});
    return this.http
      .get(this.url + '/user/schema/' + user_id, {
          headers: headers
        })
      .map(response => response.json() as Schema[]);
  }

  deleteSchemaById(id) {
    let options: RequestOptions;
    const access_token = localStorage.getItem('access_token')
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + access_token);
    options = new RequestOptions({headers: headers});
    return this.http
      .delete(this.url + '/schema/' + id, {
        headers: headers
      })
      .map(response => response.json() as Schema);
  }

  getSchema(id) {
    let options: RequestOptions;
    const access_token = localStorage.getItem('access_token')
    const user_id = localStorage.getItem('user_id');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    options = new RequestOptions({headers: headers});
    return this.http
      .get(this.url + '/schema/' + id, {
        headers: headers
      })
      .map(response => response.json() as Schema);
  }
}
