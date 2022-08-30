import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../shared/sidenav.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public sidenav: SidenavService, public userService: UserService) { }

  toggleSidenav() {
    this.sidenav.toggle();
  }

}
