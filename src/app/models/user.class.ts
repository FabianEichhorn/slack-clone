export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  img: string; // url to an image
  customIdName: string;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.password = obj ? obj.password : '';
    this.img = obj ? obj.img : '';
    this.customIdName = obj ? obj.customIdName : '';
  }

  public toJSON(): any {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      img: this.img,
      customIdName: this.customIdName,
    }
  }
}
