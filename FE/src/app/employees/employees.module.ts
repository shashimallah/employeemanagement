import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';


@NgModule({
  declarations: [
    EmployeeListComponent,
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    MenubarModule,
    ConfirmDialogModule,
    DropdownModule,
    MultiSelectModule,
  ],
  providers: [ConfirmationService]
})
export class EmployeesModule { }
