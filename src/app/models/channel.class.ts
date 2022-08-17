export class Channel {
  name: string;
  customIdName? : string;

  constructor (obj? : any) {
    this.name = obj ? obj.name : '';
    this.customIdName = obj ? obj.customIdName : '';
  }

  public toJSON() : any {
    return {
      name: this.name,
      customIdName : this.customIdName,
    }
  }
}
