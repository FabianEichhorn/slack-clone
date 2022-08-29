import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any = new User;
  currentUserId: string;
  guestLogin: boolean = false;
  login: boolean = false;
  registration: boolean = false;
  loginEmail: string;
  loginPassword: string;

  userId: string; //public id for logged in user

  // Login input values
  firstName: string;
  lastName: string;
  email: string;
  password: string;



  constructor(public firestore: AngularFirestore, public router: Router) { }

  deleteRegisterValues() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

  deleteLoginValues() {
    this.loginEmail = '';
    this.loginPassword = '';
  }

  public postToFirestore(collectionName: string, data: any) {
    this.firestore
      .collection(collectionName)
      .add(data);
  }
}
