import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem, Message, MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AppConstants } from './constants/AppConstants';
import { Employee } from './models/employee';
import { GenericService } from './services/generic.service';
import { NotifierService } from './services/notifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Employee Management';
  isLoggedIn: boolean = false;
  currentUser: Employee;

  items: MenuItem[] = [];
  msgs: MessageService[];

  constructor(
    private notifier: NotifierService,
    private genericService: GenericService,
    private router: Router
  ) {
    this.notifier.notificationChange.subscribe(ele => {
    });
    this.genericService.currentUser.subscribe(ele => {
      this.currentUser = ele;
      this.items = [];
      this.items = [
        {
          label: 'Employee Management',
          icon: 'pi pi-fw pi-home'
          // routerLink: ['/employees']
        },
      ];
      if (ele && ele.roles.length > 0 && ele.roles.map(ele => ele.code).indexOf('ROLE_ADMIN') != -1) {
        this.items[0]['routerLink'] = ['/employees'];
        let adminItems = [
          {
            label: 'Departments',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/departments']
          },
          {
            label: 'Roles',
            icon: 'pi pi-fw pi-lock',
            routerLink: ['/roles']
          },
        ];
        this.items = [...this.items, ...adminItems];
      }

    });
  }

  ngOnInit() {
  }

  logout() {
    this.genericService.post(AppConstants.LOGOUT, {}).subscribe({
      next: result => {
        this.notifier.success(result.message);
        this.genericService.logout();
      }
    })
  }

}
