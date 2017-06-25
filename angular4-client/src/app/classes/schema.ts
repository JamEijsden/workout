import {Group} from 'app/classes/group';

export class Schema {
  public id: number;
  public name = '';
  public description = '';
  public lastActivity = '';
  public groups: Group[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
