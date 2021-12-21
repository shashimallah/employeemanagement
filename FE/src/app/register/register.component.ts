import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericService } from '../services/generic.service';
import { AppConstants } from '../constants/AppConstants';
import { NotifierService } from '../services/notifier.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private genericService: GenericService,
    private router: Router,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  register() {
    let params: any = {};
    params['email'] = this.registerForm.get('email')?.value;
    params['name'] = this.registerForm.get('name')?.value;
    params['username'] = this.registerForm.get('username')?.value;
    params['password'] = this.registerForm.get('password')?.value;
    params['contactNumber'] = this.registerForm.get('contactNumber')?.value;
    this.genericService.post(AppConstants.REGISTER, params).subscribe(
      {
        next: result => {
          this.notifier.success(result.message);
          this.router.navigate(['/login']);
        },
        error: error => {
          let errorMsg = error?.error?.message;
          if (error.error == null) {
            errorMsg = "Failed to create an Employee";
          }
          this.notifier.error(errorMsg);
        }
      }
    );
  }

  login() {
    this.router.navigate(['/login']);
  }


}
