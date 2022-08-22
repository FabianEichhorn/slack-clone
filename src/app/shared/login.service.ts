import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any = new User;

  login: boolean = false;
  registration: boolean = false;

  constructor(public firestore: AngularFirestore) { }



  public postToFirestore(collectionName: string, data: any) {
    this.firestore
      .collection(collectionName)
      .add(data);
  }
}
