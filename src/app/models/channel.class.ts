export class Channel {
  name: string;

  constructor (obj? : any) {
    this.name = obj ? obj.name : 'Name aus class Datei';
  }

  public toJSON() : any {
    return {
      name: this.name,
    }
  }
}
