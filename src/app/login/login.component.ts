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
  checkUserData: any;

  constructor(public loginService: LoginService, public userService: UserService, public firestore: AngularFirestore, public router: Router) { }

  ngOnInit(): void {
    this.userService.userBox = false; // avoids opened user box after login
  }

  //Register

  generateNewUser() {
    this.getUserData();
    this.loginService.deleteRegisterValues();
    this.router.navigate(['/login'])
    this.loginService.registration = false
    alert('Thank you for your registration. You can now log in!')
  }



  getUserData() {
    this.user.img = './assets/img/user-4-64.png'
    this.user.firstName = this.loginService.firstName;
    this.user.lastName = this.loginService.lastName;
    this.user.email = this.loginService.email;
    this.user.password = this.loginService.password;
    this.loginService.postToFirestore('users', this.user.toJSON())
  };

  //Login

  checkUserLogin() {
    this.checkUserData = this.firestore.collection("users",
      ref => ref.where("email", "==", this.loginService.loginEmail))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        if (changes[0] && changes[0].password == this.loginService.loginPassword) {
          this.successfulLogin(changes);
        } else {
          this.failedLogin();
        }
      })
  }

  //Guest Login

  guestLogin() {
    this.checkUserData = this.firestore.collection("users",
      ref => ref.where("email", "==", 'guest'))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.succsessfulGuestLogin(changes);
      })
  }

  successfulLogin(changes) {
    this.router.navigate(['/channelmessages/8liMczKcm1Paer7sJbAX'])
    this.loginService.login = true;
    this.loginService.userId = changes[0].customIdName;
    this.userService.getUserData();
  }

  failedLogin() {
    alert('Incorrect E-Mail or Password')
    this.loginService.deleteLoginValues();
  }

  succsessfulGuestLogin(changes) {
    this.router.navigate(['/channelmessages/8liMczKcm1Paer7sJbAX']);
    this.loginService.guestLogin = true;
    this.loginService.login = true;
    this.loginService.userId = changes[0].customIdName;
    this.loginService.loginEmail = 'guest'
    this.userService.getUserData();
  }



}

