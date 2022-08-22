import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../shared/sidenav.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userData: any = this.userService;

  constructor(public sidenav: SidenavService, public userService: UserService) { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  openUserBox() {
    if (this.userData.userBox) {
      this.userService.userBox = false;
    } else {
      this.userData.userBox = true;
    }
  }

}
