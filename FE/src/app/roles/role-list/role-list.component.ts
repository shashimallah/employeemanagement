import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from '../../constants/AppConstants';
import { Employee } from '../../models/employee';
import { Role } from '../../models/role';
import { GenericService } from '../../services/generic.service';
import { NotifierService } from '../../services/notifier.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roleList: Role[];
  cols: any[];
  loginUserRoles: any = [];

  isLoading: boolean = false;
  isCreateRole: boolean = false;

  currentUser: Employee;
  updatedRoleData: Role;

  screen: string = '';

  constructor(
    private genericService: GenericService,
    private confirmationService: ConfirmationService,
    private notifier: NotifierService
  ) {
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
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' }
    ];
  }

  getData() {
    this.isLoading = true;
    this.genericService.get(AppConstants.GET_ALL_ROLES).subscribe({
      next: result => {
        this.roleList = result;
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
        console.log(error.message)
      }
    })
  }

  createRole() {
    this.isCreateRole = true;
    this.updatedRoleData = null;
    this.screen = 'create';
  }

  promptDeleteData(data: Role) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Role?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteData(data);
      }
    });
  }

  deleteData(data: Role) {
    let roleId = data.id
    this.genericService.delete(AppConstants.DELETE_ROLE + roleId).subscribe({
      next: result => {
        this.notifier.success(result.message);
        this.getData();
      },
      error: error => {
        console.log(error.message)
      }
    })
  }

  updateData(data: Role) {
    this.updatedRoleData = data;
    this.screen = 'update';
    this.isCreateRole = true;
  }

  exitPopup(event) {
    this.isCreateRole = false;
    if (event) {
      this.getData();
    }
  }

}
