import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './shared/login.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'slack-clone';
  login: boolean = false;

  constructor(public loginService: LoginService, public userService: UserService, public router: Router) { }

  ngOnInit() {
    if (this.loginService.questLogin || this.loginService.login) {
      this.router.navigate(['/channelmessages/8liMczKcm1Paer7sJbAX'])
    } else {
      this.router.navigate(['/login'])
    }
    console.log(this.loginService.questLogin, this.loginService.login)

  }



}
