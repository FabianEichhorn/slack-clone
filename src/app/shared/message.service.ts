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

  public message: Message = new Message(); // the message that we enter in chat-input
  public imageFile: File | null = null; // the message that we enter in chat-input
  public messages: Message[] = [];
  public thread: Message[] = [];
  public isLoading: boolean = true;
  public isUploading: boolean = false;
  public selectedButton: "normal" | "italic" | "bold" | "linethrough" | "code" = 'normal';


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
        this.isLoading = false;
      });
  }

  public postToFirestore(path: string, message: Message) {
    this.firestore
      .collection(path)
      .add(message.toJSON())
      .then(() => {
        this.isUploading = false;
        this.imageFile = null;
        this.message = new Message();
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

  public postImageAndMessage(routerUrl: string, postInThreadOfMessage: string) {
    let filePath = `/images/${new Date().getTime()}_${this.imageFile.name}`;
    const fileRef = this.firestorage.ref(filePath);
    this.firestorage
      .upload(filePath, this.imageFile)  // 1. argument = filepath on firestorage (incl. timestamp), 2. argument = actual path to the image
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.message.imageUrl = url;
            this.postMessage(routerUrl, postInThreadOfMessage);
          })
        })
      )
      .subscribe()
  }

  public post(routerUrl: string, postInThreadOfMessage: string) {
    this.isUploading = true;
    if (this.imageFile) {
      this.postImageAndMessage(routerUrl, postInThreadOfMessage);
    } else {
      this.postMessage(routerUrl, postInThreadOfMessage)
    }
  }

  private postMessage(routerUrl: string, postInThreadOfMessage: string) {
    if (routerUrl.includes('channelmessages') && postInThreadOfMessage != '') {
      const path = `channelMessages/${postInThreadOfMessage}/thread`;
      this.postToFirestore(path, this.message);
    } else if (routerUrl.includes('channelmessages')) {
      this.postToFirestore('channelMessages', this.message);
    } else if (routerUrl.includes('directmessages')) {
      this.postToFirestore('directMessages', this.message);
    }
  }


  makeTextBold() {
    if (this.selectedButton != 'bold') {
      this.selectedButton = 'bold'
    } else {
      this.selectedButton = 'normal'
    }
  }

  makeTextItalics() {
    if (this.selectedButton != 'italic') {
      this.selectedButton = 'italic'
    } else {
      this.selectedButton = 'normal'
    }
  }

  makeTextLineThrough() {
    if (this.selectedButton != 'linethrough') {
      this.selectedButton = 'linethrough'
    } else {
      this.selectedButton = 'normal'
    }
  }

  makeTextasCode() {
    if (this.selectedButton != 'code') {
      this.selectedButton = 'code'
    } else {
      this.selectedButton = 'normal'
    }
  }


}
/* this.isTextItalics = true;
    this.isTextBold = false;
    this.isTextnormal = false; */







