import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, RouterLink } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { ChannelMessage } from '../models/channelmessage.class';
import { User } from '../models/user.class';
import { LoginService } from '../shared/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  channelMessage: ChannelMessage = new ChannelMessage();
  //register
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  //login


  checkUserData: any;


  constructor(public loginService: LoginService, public firestore: AngularFirestore, public router: Router) { }

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
      .valueChanges()
      .subscribe((changes: any) => {
        if (changes[0] && changes[0].password == this.loginService.loginPassword) {
          this.router.navigate(['/channelmessages/8liMczKcm1Paer7sJbAX'])
          this.loginService.login = true;
        } else {
          alert('Incorrect E-Mail or Password')
        }
      })
    this.loginService.login = true;
  }

  //Quest Login

  questLogin() {
    this.loginService.questLogin = true;
    this.loginService.login = true;
    this.router.navigate(['/channelmessages/8liMczKcm1Paer7sJbAX'])
  }
}

