import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent {
  channelName: string = '';

  constructor(public dialogRef: MatDialogRef<DialogAddChannelComponent>) { }

  onNoClick(): void {
    this.channelName = null;
    this.dialogRef.close();
  }

}
