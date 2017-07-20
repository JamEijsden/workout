import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Exercise} from '../classes/exercise';

@Injectable()
export class ExerciseService {
  url = 'http://localhost:8080/api';

  constructor(private  http: Http) {
  }

  addExercise(exercise, gId) {
    const access_token = localStorage.getItem('access_token')
    const data = {
      groupId: gId,
      exercise: exercise
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);

    return this.http
      .post(this.url + '/exercise/add',
        JSON.stringify(data), {
          headers: headers
        })
      .map(response => response.json() as Exercise);
  }

  getExercisesByGroup(gid){
    const access_token = localStorage.getItem('access_token')
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    return this.http
      .get(this.url + '/group/exercises/' + gid, {
        headers: headers
      })
      .map(response => response.json() as Exercise[]);
  }
}
