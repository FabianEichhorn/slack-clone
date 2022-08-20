import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent implements OnInit {
  channelName: string = ''; // todo:  to connect with firebase add channel

  constructor(public dialogRef: MatDialogRef<DialogAddChannelComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
