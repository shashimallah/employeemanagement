import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from '../../constants/AppConstants';
import { GenericService } from '../../services/generic.service';
import { Department } from '../../models/department';
import { NotifierService } from '../../services/notifier.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  departmentForm: FormGroup;

  @Input() updatedData: Department;
  @Input() screen: string = '';
  @Output() exitPopup = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private genericService: GenericService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.initCreateDepartmentForm();
  }

  initCreateDepartmentForm() {
    this.departmentForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', [Validators.required, Validators.minLength(4)]]
    })
    if (this.updatedData) {
      this.departmentForm.get('code').setValue(this.updatedData.code);
      this.departmentForm.get('name').setValue(this.updatedData.name);
    }
  }

  submitDepartment() {
    if (this.screen == 'update') {
      this.updateDepartment()
    } else {
      this.createDepartment()
    }
  }

  createDepartment() {
    let params: any = {};
    params['code'] = this.departmentForm.get('code')?.value;
    params['name'] = this.departmentForm.get('name')?.value;
    this.genericService.post(AppConstants.CREATE_DEPARTMENT, params).subscribe(
      {
        next: result => {
          this.notifier.success(result.message);
          this.exitPopup.emit(true);
        },
        error: error => {
          this.notifier.error(error.error.message)
          console.log(error.message)
        }
      }
    );
  }

  updateDepartment() {
    let params: any = {};
    params['code'] = this.departmentForm.get('code')?.value;
    params['id'] = this.updatedData.id;
    params['name'] = this.departmentForm.get('name')?.value;
    this.genericService.put(AppConstants.UPDATE_DEPARTMENT, params).subscribe(
      {
        next: result => {
          this.notifier.success(result.message);
          this.exitPopup.emit(true);
        },
        error: error => {
          this.notifier.error(error.error.message)
        }
      }
    );
  }

}
