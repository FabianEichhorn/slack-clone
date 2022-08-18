import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { MessagesComponent } from './messages/messages.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ContentDrawerComponent } from './content-drawer/content-drawer.component';
import { MessageService } from './shared/message.service';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EditorModule } from '@tinymce/tinymce-angular';

// imports for Angular Firestore: problems solved with this links

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { ThreadComponent } from './thread/thread.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';




@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    ChatInputComponent,
    MessagesComponent,
    ContentDrawerComponent,
    ThreadComponent,
    LoginComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    MatButtonModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    PickerModule,
    EditorModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
