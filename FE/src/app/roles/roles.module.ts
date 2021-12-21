import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';

import { RolesRoutingModule } from './roles-routing.module';
import { RoleListComponent } from './role-list/role-list.component';
import { CreateRoleComponent } from './create-role/create-role.component';


@NgModule({
  declarations: [
    RoleListComponent,
    CreateRoleComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
  ],
  providers:[ConfirmationService]
})
export class RolesModule { }
