import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { InprintComponent } from './inprint/inprint.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { ThreadComponent } from './thread/thread.component';

const routes: Routes = [
  {
    path: 'thread', component: ThreadComponent
  },
  {
    path: 'inprint', component: InprintComponent
  },
  {
    path: 'data-protection', component: DataProtectionComponent
  },
  {
    path: 'channelmessages', component: MessagesComponent,
    data: { messageType: "channelmMssages" }
  },
  {
    path: 'channelmessages/:id', component: MessagesComponent,
    data: { messageType: "channelMessages" },
    children: [
      {
        path: 'threads',
        component: MessagesComponent, // muss evtl. noch angepasst werden
      }
    ]
  },
  {
    path: 'directmessages', component: MessagesComponent,
    data: { messageType: "directMessages" }
  },
  {
    path: 'directmessages/:id', component: MessagesComponent,
    data: { messageType: "directMessages" }
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '**', redirectTo: '/'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
