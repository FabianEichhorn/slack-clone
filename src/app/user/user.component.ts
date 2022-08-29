import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user.class';
import { LoginService } from '../shared/login.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  editProfile: boolean = false;

  constructor(public loginService: LoginService, public router: Router, public firestore: AngularFirestore, public userService: UserService) { }

  ngOnInit(): void {

  }

  logout() {
    this.loginService.guestLogin = false;
    this.loginService.login = false;
    this.router.navigate(['/login'])
    this.loginService.deleteLoginValues();
  }

  ShowEditProfile() {
    if (!this.editProfile) {
      this.editProfile = true;
    } else {
      this.editProfile = false;
    }
  }

  // async saveUser() {
  //   this.firestore
  //     .collection("users")
  //     .doc(this.loginService.userId) //BUG: this.userData.customIdName
  //     .update(this.user.toJSON())
  //     .then(() => {
  //       this.editProfile = false;
  //     });
  //   this.deleteUserValues();
  // }

  deleteUserValues() {
    console.log('Userdaten zurücksetzen');

    // this.user.firstName = '';
    // this.user.lastName = '';
    // this.user.email = '';
    // this.user.password = '';
  }


}
