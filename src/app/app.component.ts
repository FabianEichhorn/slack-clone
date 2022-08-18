import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './shared/login.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slack-clone';
  login: boolean = false;
  data: any = this.loginService;
  userData: any = this.userService

  constructor(public router: Router, public loginService: LoginService, public userService: UserService) { }


}
