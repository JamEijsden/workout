export class Group {
  public id: number;
  public name = '';
  public description = '';
  public lastActivity = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
