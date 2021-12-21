import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../constants/AppConstants';
import { Employee } from '../models/employee';
import { GenericService } from '../services/generic.service';
import { NotifierService } from '../services/notifier.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  loginUser: Employee;
  currentUser: Employee;

  constructor(
    private genericService: GenericService,
    private notifier: NotifierService

  ) {
    this.genericService.currentUser.subscribe(ele => {
      this.currentUser = ele;
    });
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    // let employeeId = this.currentUser.id;
    this.genericService.get(AppConstants.GET_LOGIN_USER).subscribe({
      next: result => {
        this.loginUser = result;
      },
      error: error => {
        this.notifier.error(error.error.message);
      }
    })
  }

}
