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

  user: User = new User();

  getUserData: any;

  constructor(public loginService: LoginService, public router: Router, public firestore: AngularFirestore, public userService: UserService) { }

  ngOnInit(): void {

  }

  logut() {
    this.loginService.guestLogin = false;
    this.loginService.login = false;
    this.router.navigate(['/login'])
    this.loginService.deleteLoginValues();
  }

}
