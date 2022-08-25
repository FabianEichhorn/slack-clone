import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user.class';
import { UserService } from './user.service';

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



  constructor(public firestore: AngularFirestore, public router: Router) { }




  public postToFirestore(collectionName: string, data: any) {
    this.firestore
      .collection(collectionName)
      .add(data);
  }
}
