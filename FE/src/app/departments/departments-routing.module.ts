import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../services/auth-guard.service';
import { DepartmentListComponent } from './department-list/department-list.component';

const routes: Routes = [
  { path: '', component: DepartmentListComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
