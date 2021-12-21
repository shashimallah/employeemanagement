import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from '../../constants/AppConstants';
import { GenericService } from '../../services/generic.service';
import { Role } from '../../models/role';
import { error } from '@angular/compiler/src/util';
import { NotifierService } from '../../services/notifier.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  @Input() screen: string = '';
  @Input() updatedData: Role;
  @Output() exitPopup = new EventEmitter<boolean>();

  roleForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private genericService: GenericService,
    private notifier: NotifierService
  ) {

  }

  ngOnInit(): void {
    this.initCreateRoleForm();
  }

  initCreateRoleForm() {
    this.roleForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', [Validators.required, Validators.minLength(4)]]
    })
    if (this.updatedData && this.screen == 'update') {
      this.roleForm.get('code').setValue(this.updatedData.code);
      this.roleForm.get('name').setValue(this.updatedData.name);
    }
  }

  submitRole() {
    if (this.screen == 'update') {
      this.updateRole();
    } else {
      this.createRole();;
    }
  }

  createRole() {
    let params: any = {};
    params['code'] = this.roleForm.get('code')?.value;
    params['name'] = this.roleForm.get('name')?.value;
    this.genericService.post(AppConstants.CREATE_ROLE, params).subscribe(
      {
        next: result => {
          this.notifier.success(result.message)
          this.exitPopup.emit(true);
        },
        error: error => {
          this.notifier.error(error.error.message)
        }
      }
    );
  }

  updateRole() {
    let params: any = {};
    params['code'] = this.roleForm.get('code')?.value;
    params['id'] = this.updatedData.id;
    params['name'] = this.roleForm.get('name')?.value;
    this.genericService.put(AppConstants.UPDATE_ROLE, params).subscribe({
      next: result => {
        this.notifier.success(result.message);
        this.exitPopup.emit(true);
      },
      error: error => {
        this.notifier.error(error.error.message)
      }
    })

  }

}
