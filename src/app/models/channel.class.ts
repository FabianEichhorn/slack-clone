export class Channel {
  name: string;
  customIdName? : string;
  users: string[];

  constructor (obj? : any) {
    this.name = obj ? obj.name : '';
    this.customIdName = obj ? obj.customIdName : '';
    this.users = obj ? obj.users : [];
  }

  public toJSON() : any {
    return {
      name: this.name,
      customIdName : this.customIdName,
      users: this.users,
    }
  }
}
