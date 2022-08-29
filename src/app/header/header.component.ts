import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../shared/sidenav.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // userData: any = this.userService; // TRICK

  constructor(public sidenav: SidenavService, public userService: UserService) { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  // public toggleUserBox() {
  //   // if (this.userService.showUserBox) {
  //   //   this.userService.showUserBox = false;
  //   // } else {
  //   //   this.userService.showUserBox = true;
  //   // }
  //   // this.userService.showUserBox = !this.userService.showUserBox; // TRICK
  // }

}
