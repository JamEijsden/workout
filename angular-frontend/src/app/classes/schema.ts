import {Group} from 'app/classes/group';

export class Schema {
  public id: string;
  public name = '';
  public description = '';
  public lastActivity = '';
  public groups: Group[] = [];
  public rated: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
