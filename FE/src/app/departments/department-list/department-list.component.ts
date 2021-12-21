import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from '../../constants/AppConstants';

import { Department } from '../../models/department';
import { Employee } from '../../models/employee';
import { GenericService } from '../../services/generic.service';
import { NotifierService } from '../../services/notifier.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  departmentList: Department[];
  cols: any[];
  loginUserRoles: any[];

  isLoading: boolean = false;
  isCreateDepartment: boolean = false;

  deptPopupHeader: string = '';
  screen: string = '';

  currentUser: Employee;
  updatedDeptData: Department;

  constructor(
    private genericService: GenericService,
    private confirmationService: ConfirmationService,
    private notifier: NotifierService
  ) {
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' }
    ];
    this.genericService.currentUser.subscribe(ele => {
      this.currentUser = ele;
      if (ele && ele.roles.length > 0) {
        this.loginUserRoles = ele.roles.map(ele =>ele.code);
      } else {
        this.loginUserRoles = [];
      }
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.genericService.get(AppConstants.GET_ALL_DEPARTMENTS).subscribe({
      next: result => {
        this.departmentList = result;
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
        console.log(error.message)
      }
    })
  }

  createDepartment() {
    this.deptPopupHeader = 'Create Department';
    this.screen = 'create';
    this.updatedDeptData = null;
    this.isCreateDepartment = true;
  }

  promptDeleteData(data: Department) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Department?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteData(data);
      }
    });
  }

  deleteData(data: Department) {
    let deptId = data.id;
    this.genericService.delete(AppConstants.DELETE_DEPARTMENT + deptId).subscribe({
      next: result => {
        this.notifier.success(result.message)
        this.getData();
      },
      error: error => {
        this.notifier.error(error.error.message)
      }
    })
  }

  updateData(data: Department) {
    this.deptPopupHeader = 'Update Department';
    this.screen = 'update';
    this.updatedDeptData = data;
    this.isCreateDepartment = true;
  }

  exitPopup(event) {
    this.isCreateDepartment = false;
    if (event) {
      this.getData();
    }
  }

}
