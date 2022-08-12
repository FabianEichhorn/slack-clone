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

    this.firestore
      .collection("channelmessages")
      .valueChanges()
      .subscribe((changes: any) => {
        this.messages = changes;
        console.log(changes);
      });
  }

  getFirestoreData() {

    this.firestore
      .collection("channelmessages")
      .valueChanges()
      .subscribe((changes: any) => {
        this.messages = changes;
        console.log(changes);
      });
  }


}









