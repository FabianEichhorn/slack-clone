
// imports Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// imports firestore modules
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// imports tiny mce and emoji picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EditorModule } from '@tinymce/tinymce-angular';

// imports Angular components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { MessagesComponent } from './messages/messages.component';
import { environment } from '../environments/environment';
import { ContentDrawerComponent } from './content-drawer/content-drawer.component';
import { MessageService } from './shared/message.service';
import { FormsModule } from '@angular/forms';
import { ThreadComponent } from './thread/thread.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { InprintComponent } from './inprint/inprint.component';
import { RouterModule } from '@angular/router';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { RegisterComponent } from './register/register.component';


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
    InprintComponent,
    DataProtectionComponent,
    DialogAddChannelComponent,
    RegisterComponent,
  ],
  imports: [
    // imports Angular Material
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatProgressBarModule,

    // imports firestore modules
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,

    // imports tiny mce and emoji picker
    PickerModule,
    EditorModule,

    // imports Angular components
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
