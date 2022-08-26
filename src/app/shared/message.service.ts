import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Message } from '../models/message.class';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages: Message[] = [];
  public thread: Message[] = [];
  public isLoading: boolean = true;
  public isUploading: boolean = false;
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

  public postToFirestore(path: string, message: Message) {
    this.firestore
      .collection(path)
      .add(message.toJSON())
      .then(() => {
        this.isUploading = false;
      })
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

  public postImageAndMessage(imageFile: File, message: Message, routerUrl: string, postInThreadOfMessage: string) {
    let filePath = `/images/${new Date().getTime()}_${imageFile.name}`;
    const fileRef = this.firestorage.ref(filePath);
    this.firestorage
      .upload(filePath, imageFile)  // 1. argument = filepath on firestorage (incl. timestamp), 2. argument = actual path to the image
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            message.imageUrl = url;
            this.postMessage(message, routerUrl, postInThreadOfMessage);
          })
        })
      )
      .subscribe()
  }

  public post(imageFile: File, message: Message, routerUrl: string, postInThreadOfMessage: string) {
    this.isUploading = true;
    if (imageFile) {
      this.postImageAndMessage(imageFile, message, routerUrl, postInThreadOfMessage);
    } else {
      this.postMessage(message, routerUrl, postInThreadOfMessage)
    }
  }

  private postMessage(message: Message, routerUrl: string, postInThreadOfMessage: string) {
    if (routerUrl.includes('channelmessages') && postInThreadOfMessage != '') {
      const path = `channelMessages/${postInThreadOfMessage}/thread`;
      this.postToFirestore(path, message);
    } else if (routerUrl.includes('channelmessages')) {
      this.postToFirestore('channelMessages', message);
    } else if (routerUrl.includes('directmessages')) {
      this.postToFirestore('directMessages', message);
    }
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







