import {Exercise} from "./exercise";

export class Group {
  public id: number;
  public name = '';
  public description = '';
  public lastActivity = '';
  public exercises: Exercise[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
