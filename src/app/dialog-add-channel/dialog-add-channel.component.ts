import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SidenavService } from '../shared/sidenav.service';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent {
  channelName: string = '';
  isSaveClicked: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddChannelComponent>, public sidenavService: SidenavService) { }

  public addChannel(ngForm: any) {
    if (ngForm.submitted && ngForm.form.valid && this.isSaveClicked) {
      this.sidenavService.addChannel(this.channelName, this.dialogRef);
    }
  }

  public onNoClick(): void {
    this.channelName = null;
    this.dialogRef.close();
  }
}
