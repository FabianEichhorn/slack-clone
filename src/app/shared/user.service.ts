import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  users: User[] = [];

  constructor(public firestore: AngularFirestore) {
    this.getUsers();
  }

  ngOnInit(): void {
  }

  getUsers() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((users: any) => {
        this.users = users;
      });
  }
}

