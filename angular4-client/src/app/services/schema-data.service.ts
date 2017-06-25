import { Injectable } from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Schema} from '../classes/schema';


@Injectable()
export class SchemaDataService {
  access_token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqaW1taWUiLCJleHAiOjE0OTkxNzI5MTZ9.4RssJjxkjm-HLKC5h5eaKgVwJL2x-DcztBzJ-xorkOls5N-ip05wbLEKV-W8vj5_uoC4Sga-VJmZIfrvmIBZOw';
  url = 'http://localhost:8080/api';
  constructor(private  http: Http,  public snackBar: MdSnackBar) { }
  addSchema(values) {

    const schema = new Schema();
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
    headers.append('Authorization', this.access_token);
    options = new RequestOptions({headers: headers});
    return this.http
      .post(this.url + '/schema',
        JSON.stringify(data), {
          headers: headers
        })
      .map(response => response.json() as Schema);

  }

  getCurrentUserSchemas() {
    let options: RequestOptions;
    const user_id = localStorage.getItem('user_id');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.access_token);
    options = new RequestOptions({headers: headers});
    return this.http
      .get(this.url + '/user/schema/' + user_id, {
          headers: headers
        })
      .map(response => response.json() as Schema[]);
  }

  deleteSchemaById(id) {
    let options: RequestOptions;
    const headers = new Headers();
    headers.append('Authorization', this.access_token);
    options = new RequestOptions({headers: headers});
    return this.http
      .delete(this.url + '/schema/' + id, {
        headers: headers
      })
      .map(response => response.json() as Schema);
  }

  getSchema(id) {
    let options: RequestOptions;
    const user_id = localStorage.getItem('user_id');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.access_token);
    options = new RequestOptions({headers: headers});
    return this.http
      .get(this.url + '/schema/' + id, {
        headers: headers
      })
      .map(response => response.json() as Schema);
  }
}
