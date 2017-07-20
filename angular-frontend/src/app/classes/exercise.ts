export class Exercise {
  public id: string;
  public sets: number;
  public reps: number;
  public best: number;
  public name: string;
  public lastActivity: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
