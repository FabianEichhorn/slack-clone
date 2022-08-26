import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../models/message.class';
import { User } from '../models/user.class';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  users: User[] = [];

  userBox: boolean = false;
  userData: User;

  constructor(public firestore: AngularFirestore, public loginService: LoginService) {
    this.getUsers();
  }

  ngOnInit(): void {

  }

  public getUserData() {
    this.firestore.collection("users",
      ref => ref.where("email", "==", this.loginService.loginEmail))
      .valueChanges()
      .subscribe((changes: any) => {
        this.userData = changes[0];
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
}

