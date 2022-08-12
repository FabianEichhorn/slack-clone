import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  channels: any = [];

  constructor(public firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection("channels")
      .valueChanges()
      .subscribe((changes: any) => {
        this.channels = changes;
        console.log(changes);
      });
  }
}
