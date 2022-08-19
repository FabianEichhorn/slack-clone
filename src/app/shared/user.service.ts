import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  users: User[] = [];
  participantsIds: string[] = [];
  participants: User[] = [];

  userBox: boolean = false;

  constructor(public firestore: AngularFirestore) {
    this.getUsers();
  }

  ngOnInit(): void {
  }

  private getUsers() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((users: any) => {
        this.users = users;
      });
  }

  public getParticipants(messages: any) {
    this.getParticipantsIds(messages);
    this.getParticipantsData();
  }

  private getParticipantsIds(messages: any) {
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (this.participantsIds.indexOf(message.userId) === -1) { // push userId only if it isn't already in the array
        this.participantsIds.push(message.userId);
      }
    }
  }

  private getParticipantsData() {
    console.log(this.participantsIds);

    for (let i = 0; i < this.participantsIds.length; i++) {
      const participantId = this.participantsIds[i];
      // wenn im array participants bereits die ID vorkommt - nicht laden, sonst laden
      console.log(this.participantAlreadyLoaded(participantId));

      if (!this.participantAlreadyLoaded(participantId)) {
        this.getParticipant(participantId);
      }
    }
    console.log(this.participants);
  }

  // returns true, if a participant is already loaded, to avoid redundant data loadings from firebase
  private participantAlreadyLoaded(participantId: string): boolean {
    return this.participants.some(participant => participant.customIdName === participantId)
  }

  private getParticipant(participantId: string) {
    console.log('Firestore Abfrage startet: ', participantId);

    this.firestore
      .collection('users')
      .doc(participantId)
      .valueChanges({ idField: 'customIdName' })
      .subscribe((participant: any) => {
        if (!this.participantAlreadyLoaded(participantId)) {
          this.participants.push(participant);
        }
      })
  }
}

