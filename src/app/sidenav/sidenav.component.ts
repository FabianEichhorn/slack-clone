import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { SidenavService } from '../shared/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public router: Router, public sidenavService: SidenavService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sidenavService.getChannels();
    this.sidenavService.getUsers();
  }

  public openDialogAddChannel() {
    // todo: implement add channel Logik und Dialog
    const dialogRef = this.dialog.open(DialogAddChannelComponent);

    dialogRef.afterClosed().subscribe(channelName => {
      if (channelName != '') {
        this.sidenavService.addChannel(channelName);
      }
    });
  }
}
