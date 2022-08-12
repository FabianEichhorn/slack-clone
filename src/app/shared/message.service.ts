import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages = [];

  constructor(public firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.messages = this.getMessages();

    this.firestore
      .collection("channelmessages")
      .valueChanges()
      .subscribe((changes: any) => {
        this.messages = changes;
        console.log(changes);
      });
  }


  // Empty array for messages
  public getMessages() {
    return [];
  }

}









