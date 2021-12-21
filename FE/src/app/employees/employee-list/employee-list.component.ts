import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from '../../constants/AppConstants';
import { Employee } from '../../models/employee';
import { GenericService } from '../../services/generic.service';
import { NotifierService } from '../../services/notifier.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  cols: any[];
  employees: any[];
  roleCodes: any = [];

  isLoading: boolean = false;
  iscreateEmployee: boolean = false;

  currentUser: Employee;
  updatedEmployeeData: Employee;

  screen: string = '';

  constructor(
    private genericService: GenericService,
    private confirmationService: ConfirmationService,
    private notifier: NotifierService
  ) {
    this.genericService.currentUser.subscribe(ele => {
      this.currentUser = ele;
      if (ele) {
        this.roleCodes = ele.roles.map(ele =>ele.code);
      } else {
        this.roleCodes = [];
      }
    });
  }

  ngOnInit(): void {
    this.getData();
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'salary', header: 'Salary' },
      { field: 'contactNumber', header: 'Contact Number' },
      { field: 'department', header: 'Department' }
    ];
  }

  getData() {
    this.isLoading = true;
    this.employees = [];
    this.genericService.get(AppConstants.GET_ALL_EMPLOYEES).subscribe({
      next: result => {
        this.employees = result;
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
      }
    }
    )
  }

  createEmployee() {
    this.screen = 'create';
    this.updatedEmployeeData = null;
    this.iscreateEmployee = true;
  }

  updateData(data: Employee) {
    this.screen = 'update';
    this.updatedEmployeeData = data;
    this.iscreateEmployee = true;
  }

  promptDeleteData(data: Employee) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Employee?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteData(data);
      }
    });
  }

  deleteData(data: Employee) {
    let employeeId = data.id;
    this.genericService.delete(AppConstants.DELETE_EMPLOYEE + employeeId).subscribe({
      next: result => {
        this.notifier.success(result.message)
        this.getData();
      },
      error: error => {
        this.notifier.error(error.error.message)
      }
    }
    )
  }

  exitPopup(event) {
    this.iscreateEmployee = false;
    if (event) {
      this.getData();
    }
  }

}
