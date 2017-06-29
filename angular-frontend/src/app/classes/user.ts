import {Schema} from './schema';
export class User {
  public id: number;
  public firstname = '';
  public lastname = '';
  public email = '';
  public schemas: Schema[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
