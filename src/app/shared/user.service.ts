import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../models/user.class';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  users: User[] = [];
  user: User = new User();
  public showUserBox: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(public firestore: AngularFirestore, public loginService: LoginService) {
    this.getUsers();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  public getUser() {
    this.firestore.collection("users",
      ref => ref.where("email", "==", this.loginService.loginEmail))
      .valueChanges({ idField: 'customIdName' })
      .pipe(takeUntil(this.destroy$))
      .subscribe((changes: any) => {
        this.user.firstName = changes[0].firstName;
        this.user.lastName = changes[0].lastName;
        this.user.email = changes[0].email;
        this.user.password = changes[0].password;
        this.user.img = changes[0].img;
        this.user.customIdName = changes[0].customIdName;
      })
  }

  private getUsers() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => {
        this.users = users;
      });
  }

  public changeUser() {
    this.firestore
      .collection("users")
      .doc(this.user.customIdName)
      .update(this.user.toJSON())
  }

  public toggleUserBox() {
    this.showUserBox = !this.showUserBox;
  }
}

