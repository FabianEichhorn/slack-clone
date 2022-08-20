import { Component } from '@angular/core';
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

  constructor(public loginService: LoginService, public userService: UserService) { }

}
