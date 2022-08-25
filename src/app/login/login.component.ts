import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Message } from '../models/message.class';
import { User } from '../models/user.class';
import { LoginService } from '../shared/login.service';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  channelMessage: Message = new Message();

  //register

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  checkUserData: any;




  constructor(public loginService: LoginService, public userService: UserService, public firestore: AngularFirestore, public router: Router) { }

  ngOnInit(): void { }

  //Register

  generateNewUser() {
    this.getUserData();
    this.deleteValue();
  }

  deleteValue() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

  getUserData() {
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.email = this.email;
    this.user.password = this.password;
    this.loginService.postToFirestore('users', this.user.toJSON())
  };

  //Login

  checkUserLogin() {
    this.checkUserData = this.firestore.collection("users",
      ref => ref.where("email", "==", this.loginService.loginEmail))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        if (changes[0] && changes[0].password == this.loginService.loginPassword) {
          this.router.navigate(['/channelmessages/8liMczKcm1Paer7sJbAX'])
          this.loginService.login = true;
          this.loginService.userId = changes[0].customIdName;
          this.userService.getUserData();
        } else {
          alert('Incorrect E-Mail or Password')
        }
      })
  }

  //Quest Login

  questLogin() {
    this.checkUserData = this.firestore.collection("users",
      ref => ref.where("email", "==", 'guest'))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.router.navigate(['/channelmessages/8liMczKcm1Paer7sJbAX']);
        this.loginService.guestLogin = true;
        this.loginService.login = true;
        this.loginService.userId = changes[0].customIdName;
        this.loginService.loginEmail = 'guest'
        this.userService.getUserData();
      })
  }



}

