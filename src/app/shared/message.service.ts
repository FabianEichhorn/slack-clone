import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChannelMessage } from '../models/channelmessage.class';
import { Threadmessage } from '../models/threadmessage.class';
import { UserService } from './user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages: ChannelMessage[] = [];
  public thread: Threadmessage[] = [];
  public isLoading: boolean = true;
  public selectedButton: "normal" | "italic" | "bold" | "linethrough" = 'normal';


  constructor(public firestore: AngularFirestore, public userService: UserService, private firestorage: AngularFireStorage) { }


  ngOnInit(): void {

  }

  public getFromFirebase(messageType: string, id: string | null) {
    if (messageType == 'channelMessages') {
      this.getChannelMessageFromFirebase(id);
    } else if (messageType == 'directMessages') {
      this.getDirectMessageFromFirebase(id);
    }
  }

  private getChannelMessageFromFirebase(id: string | null) {
    this.firestore
      .collection("channelMessages", ref => ref.where('channelId', '==', id))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.messages = changes;
        this.messages.sort((a, b) => { return a.timestamp - b.timestamp });
        this.userService.getParticipants(this.messages);
        this.isLoading = false;
      });
  }

  private getDirectMessageFromFirebase(id: string | null) {
    this.firestore
      .collection("directMessages", ref => ref
        .where('channelId', '==', id) // gives back all directMessages where current logged in user is part of
      )
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.messages = changes;
        this.messages.sort((a, b) => { return a.timestamp - b.timestamp });
        this.userService.getParticipants(this.messages);
        this.isLoading = false;
      });
  }

  public postToFirestore(collectionName: string, data: any) {
    this.firestore
      .collection(collectionName)
      .add(data);
  }

  public postThreadToFirestore(collectionName: string, postInThreadOfMessage: string, data: any) {
    this.firestore
      .collection(collectionName)
      .doc(postInThreadOfMessage) // message-id
      .collection('thread')
      .add(data)
  }

  public getThread(messageId: string) {
    this.firestore
      .collection('channelMessages')
      .doc(messageId)
      .collection('thread')
      .valueChanges()
      .subscribe((changes: any) => {
        this.thread = changes;
        this.thread.sort((a, b) => { return a.timestamp - b.timestamp });
      });
  }

  public uploadImageFireStorage(imageFile: File) {
    if (imageFile) {
      let filePath = `/images/${new Date().getTime()}_${imageFile.name}`;
      const fileRef = this.firestorage.ref(filePath);
      this.firestorage
        .upload(filePath, imageFile)  // 1. argument = filepath on firestorage (incl. timestamp), 2. argument = actual path to the image
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              console.log(url);
              //insert image details in firebase
            })
          })
        )
        .subscribe()
    }
  }

  public getImageFireStorage() {

  }

  makeTextBold() {
    if (this.selectedButton != 'bold') {
      this.selectedButton = 'bold'
    } else {
      this.selectedButton = 'normal'
    }
    console.log(this.selectedButton);
  }

  makeTextItalics() {
    if (this.selectedButton != 'italic') {
      this.selectedButton = 'italic'
    } else {
      this.selectedButton = 'normal'
    }
    console.log(this.selectedButton);
  }

  makeTextLineThrough() {
    if (this.selectedButton != 'linethrough') {
      this.selectedButton = 'linethrough'
    } else {
      this.selectedButton = 'normal'
    }
    console.log(this.selectedButton);
  }
}
/* this.isTextItalics = true;
    this.isTextBold = false;
    this.isTextnormal = false; */







