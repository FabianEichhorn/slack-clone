import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from '../shared/message.service';
import { SidenavService } from '../shared/sidenav.service';

@Component({
  selector: 'app-content-drawer',
  templateUrl: './content-drawer.component.html',
  styleUrls: ['./content-drawer.component.scss']
})
export class ContentDrawerComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') public sidenav: MatSidenav | undefined;

  private destroy$ = new Subject<void>();

  constructor(public messageService: MessageService, private sideNavService: SidenavService) { }

  ngOnInit() {
    this.sideNavService.sideNavToggleSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
      if (this.sidenav) {
        this.sidenav.toggle();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
