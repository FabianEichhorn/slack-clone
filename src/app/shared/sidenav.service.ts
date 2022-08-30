import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { Channel } from '../models/channel.class';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class SidenavService implements OnDestroy {
  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public channels: Channel[] = [];
  public users: User[] = [];
  public hideinMaxWidth: any;
  public isToggleTrue: boolean = true;
  public isToggleTruePrivate: boolean = true;
  public arrowDrop: string = 'arrow_drop_down';
  public arrowDropPrivate: string = 'arrow_drop_down';
  public isUploadingChannel: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(public firestore: AngularFirestore) { }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public toggle(): void {
    return this.sideNavToggleSubject.next(null);
  }

  public toggleChannels(){
    if (this.isToggleTrue == false) {
      this.isToggleTrue = true;
      document.getElementById('channel-name').classList.remove('d-none');
    } else {
      document.getElementById('channel-name').classList.add('d-none')
      this.isToggleTrue = false;
    }
  }
  public togglePrivateMessages(){
    if (this.isToggleTruePrivate == false) {
      this.isToggleTruePrivate = true;
      document.getElementById('private-name').classList.remove('d-none');
    } else {
      document.getElementById('private-name').classList.add('d-none')
      this.isToggleTruePrivate = false;
    }
  }

  public getChannels() {
    this.firestore
      .collection("channels", ref => ref.where("users", "array-contains", "3C651LYhk1HaB8Y0Vsbf")) // query all channels where current user is part of
      .valueChanges( {idField: 'customIdName'} )
      .pipe(takeUntil(this.destroy$))
      .subscribe((changes: any) => {
        this.channels = changes;
      });
  }

  public getUsers() {
    this.firestore
      .collection("users")
      .valueChanges( {idField: 'customIdName'} )
      .pipe(takeUntil(this.destroy$))
      .subscribe((changes: any) => {
        this.users = changes;
      });
  }

  public addChannel(channelName: string, dialogRef: MatDialogRef<DialogAddChannelComponent>) {
    this.isUploadingChannel = true;
    this.firestore
      .collection('channels')
      .add({
        'name': channelName,
        'users': ['0ktdB0VydBMemqEwcDIv', '3C651LYhk1HaB8Y0Vsbf', '8dbx47l03bPocYuOfuJ4'],
      })
      .then(() => {
        this.isUploadingChannel = false;
        dialogRef.close();
      })
  }

  public hideSidenav() {
    if (this.hideinMaxWidth == true) {
      document.getElementById('sidenav').classList.add('d-none')
    } else {
      document.getElementById('sidenav').classList.remove('d-none')
    }
  }

  changeArrowDrop() {
    if (this.arrowDrop == 'arrow_drop_down') {
      this.arrowDrop = 'arrow_drop_up'
    } else {
      this.arrowDrop = 'arrow_drop_down'
    }
  }

  changeArrowDropPrivate() {
    if (this.arrowDropPrivate == 'arrow_drop_down') {
      this.arrowDropPrivate = 'arrow_drop_up'
    } else {
      this.arrowDropPrivate = 'arrow_drop_down'
    }
  }
}
