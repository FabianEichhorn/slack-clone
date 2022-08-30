import { Component, OnInit } from '@angular/core';
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
  backupUser: User = new User();

  constructor(public loginService: LoginService, public router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.createBackupUser();
  }

  logout() {
    this.loginService.guestLogin = false;
    this.loginService.login = false;
    this.router.navigate(['/login'])
    this.loginService.deleteLoginValues();
  }

  showEditProfile() {
    if (!this.editProfile) {
      this.editProfile = true;
    } else {
      this.editProfile = false;
    }
  }

  createBackupUser() {
    this.backupUser.firstName = this.userService.user.firstName;
    this.backupUser.lastName = this.userService.user.lastName;
    this.backupUser.email = this.userService.user.email;
    this.backupUser.password = this.userService.user.password;
    this.backupUser.img = this.userService.user.img;
    this.backupUser.customIdName = this.userService.user.customIdName;
  }

  // if we don't want to save --> reset the input values to default
  undoChanges() {
    this.userService.user.firstName = this.backupUser.firstName;
    this.userService.user.lastName = this.backupUser.lastName
    this.userService.user.email = this.backupUser.email
    this.userService.user.password = this.backupUser.password
    this.userService.user.img = this.backupUser.img
    this.userService.user.customIdName = this.backupUser.customIdName
  }

}
