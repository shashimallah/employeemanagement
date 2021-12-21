import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../models/role';
import { Department } from '../../models/department';
import { GenericService } from '../../services/generic.service';
import { AppConstants } from '../../constants/AppConstants';
import { Employee } from '../../models/employee';

import { NotifierService } from '../../services/notifier.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @Input() screen?: string = '';
  @Input() updatedData?: Employee;
  @Output() exitPopup = new EventEmitter<boolean>();

  createEmployeeForm: FormGroup;

  departments: Department[];
  roles: Role[];
  selectedRoles: Role[];

  emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  constructor(
    private formBuilder: FormBuilder,
    private genericService: GenericService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.getDepartments();
    this.getRoles();
    this.createEmployeeFormInit();
  }

  createEmployeeFormInit() {
    this.createEmployeeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      department: ['', [Validators.required]],
      roles: ['', [Validators.required]],
      salary: ['', Validators.required]
    });
    if (this.updatedData && this.screen == 'update') {
      this.createEmployeeForm.get('email').setValue(this.updatedData.email);
      this.createEmployeeForm.get('name').setValue(this.updatedData.name);
      this.createEmployeeForm.get('username').setValue(this.updatedData.username);
      this.createEmployeeForm.get('password').setValue(this.updatedData.password);
      this.createEmployeeForm.get('contactNumber').setValue(this.updatedData.contactNumber);
      this.createEmployeeForm.get('salary').setValue(this.updatedData.salary);
      this.createEmployeeForm.get('department').setValue(this.updatedData.department);
      this.createEmployeeForm.get('roles').setValue(this.updatedData.roles);
    }
  }

  getDepartments() {
    this.departments = [];
    this.genericService.get(AppConstants.GET_ALL_DEPARTMENTS).subscribe({
      next: result => {
        this.departments = result;
      },
      error: error => {
        console.log(error.message)
      }
    })
  }

  getRoles() {
    this.roles = [];
    this.genericService.get(AppConstants.GET_ALL_ROLES).subscribe({
      next: result => {
        this.roles = result;
      },
      error: error => {
        console.log(error.message)
      }
    })
  }

  submitEmployee() {
    if (this.screen == 'update') {
      this.updateEmployee();
    } else {
      this.createEmployee()
    }
  }

  createEmployee() {
    console.log(this.createEmployeeForm)
    let selectedRoles = this.createEmployeeForm.get('roles').value;
    let paramRoles = [];
    selectedRoles.forEach(element => {
      paramRoles.push({
        'id': element.id
      })
    });
    let params = {
      'email': this.createEmployeeForm.get('email').value,
      'name': this.createEmployeeForm.get('name').value,
      'username': this.createEmployeeForm.get('username').value,
      'password': this.createEmployeeForm.get('password').value,
      'contactNumber': this.createEmployeeForm.get('contactNumber').value,
      'salary': this.createEmployeeForm.get('salary').value,
      'department': {
        'id': this.createEmployeeForm.get('department').value.id
      },
      'roles': paramRoles
    };
    this.genericService.post(AppConstants.CREATE_EMPLOYEE, params).subscribe({
      next: result => {
        this.notifier.success(result.message)
        this.exitPopup.emit(true);
      },
      error: error => {
        this.notifier.error(error.error.message)
      }
    })
  }

  updateEmployee() {
    let selectedRoles = this.createEmployeeForm.get('roles').value;
    let paramRoles = [];
    selectedRoles.forEach(element => {
      paramRoles.push({
        'id': element.id
      })
    });
    let params = {
      'id': this.updatedData.id,
      'email': this.createEmployeeForm.get('email').value,
      'name': this.createEmployeeForm.get('name').value,
      'username': this.createEmployeeForm.get('username').value,
      'contactNumber': this.createEmployeeForm.get('contactNumber').value,
      'salary': this.createEmployeeForm.get('salary').value,
      'password': this.createEmployeeForm.get('password').value,
      'department': {
        'id': this.createEmployeeForm.get('department').value.id
      },
      'roles': paramRoles
    };
    this.genericService.put(AppConstants.UPDATE_EMPLOYEE, params).subscribe({
      next: result => {
        this.notifier.success(result.message)
        this.exitPopup.emit(true);
      },
      error: error => {
        this.notifier.error(error.error.message)
      }
    })
  }

}
