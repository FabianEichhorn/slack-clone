export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  img: string; // url to an image


  constructor (obj? : any) {
    this.firstName = obj ? obj.firstName : 'Max (bsp aus class Datei)';
    this.lastName = obj ? obj.lastName : 'Mustermann (bsp aus class Datei)';
    this.email = obj ? obj.email : 'max.mustermann@test.de (bsp aus class Datei)';
    this.password = obj ? obj.password : '';
    this.img = obj ? obj.img : 'assets/img/user.png';
  }


  public toJSON() : any {
    return {
      firstName : this.firstName,
      lastName : this.lastName,
      email : this.email,
      password : this.password,
      img : this.img,
    }
  }
}
