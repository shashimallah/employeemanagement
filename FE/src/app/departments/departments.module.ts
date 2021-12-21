import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';


import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';


@NgModule({
  declarations: [
    DepartmentListComponent,
    CreateDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
  ],
  providers:[ConfirmationService]
})
export class DepartmentsModule { }
