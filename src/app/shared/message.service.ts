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

  }

  public getFromFirebase() {
    this.firestore
      .collection("channelMessages")
      .valueChanges()
      .subscribe((changes: any) => {
        this.messages = changes;
      });
  }

  public postToFirestore(collectionName: string, data:any) {
    this.firestore
      .collection(collectionName)
      .add(data);
  }


}









