import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.class';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  users: User[] = [];
  user: User = new User();

  public showUserBox: boolean = false;

  constructor(public firestore: AngularFirestore, public loginService: LoginService) {
    this.getUsers();
  }

  ngOnInit(): void {

  }

  public getUser() {
    this.firestore.collection("users",
      ref => ref.where("email", "==", this.loginService.loginEmail))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.user.firstName = changes[0].firstName;
        this.user.lastName = changes[0].lastName;
        this.user.email = changes[0].email;
        this.user.password = changes[0].password;
        this.user.img = changes[0].img;
        this.user.customIdName = changes[0].customIdName;
        // console.log(this.user); //BUG: keinen neuen user instanziiert
      })
  }

  private getUsers() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((users: any) => {
        this.users = users;
      });
  }

  public changeUser() {
    this.firestore
      .collection("users")
      .doc(this.user.customIdName)
      .update(this.user.toJSON())
      .then(() => {});
  }

  public toggleUserBox() {
    this.showUserBox = !this.showUserBox;
  }
}

