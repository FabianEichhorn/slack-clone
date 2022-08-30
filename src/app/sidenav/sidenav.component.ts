import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { LoginService } from '../shared/login.service';
import { SidenavService } from '../shared/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public router: Router, public sidenavService: SidenavService, public dialog: MatDialog, public loginService: LoginService) { }

  ngOnInit(): void {
    this.sidenavService.getChannels();
    this.sidenavService.getUsers();
  }


  public openDialogAddChannel() {
    const dialogRef = this.dialog.open(DialogAddChannelComponent);
    dialogRef.afterClosed().subscribe(channelName => {
      if (channelName != '' && channelName != undefined) {
        this.sidenavService.addChannel(channelName);
      }
    });
  }
}
