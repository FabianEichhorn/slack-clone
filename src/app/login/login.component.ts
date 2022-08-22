import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, RouterLink } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { User } from '../models/user.class';
import { LoginService } from '../shared/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  //register
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  //login
  loginEmail: string;
  loginPassword: string;

  checkUserData: any;



  constructor(public loginService: LoginService, public firestore: AngularFirestore, public router: Router) { }

  ngOnInit(): void {

  }

  checking() {


    console.log(this.checkUserData)
  }

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
      ref => ref.where("email", "==", this.loginEmail))
      .valueChanges()
      .subscribe((changes: any) => {
        if (changes[0] && changes[0].password == this.loginPassword) {
          this.router.navigate(['/channelmessages'])
          this.loginService.login = true
        } else {
          alert('Incorrect E-Mail or Password')
        }
      })




  }



}



  //if (this.checkUserData) {
  //alert('correct')
  //} else {
  //alert('Incorrect E-Mail or Password, please try again')
  //}

