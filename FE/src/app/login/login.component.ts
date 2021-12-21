import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericService } from '../services/generic.service';
import { error } from '@angular/compiler/src/util';
import { NotifierService } from '../services/notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  roles: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private genericService: GenericService,
    private router: Router,
    private notifier: NotifierService
  ) {
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
    });
  }

  login() {
    let params: any = {};
    params['username'] = this.loginForm.get('username')?.value;
    params['password'] = this.loginForm.get('password')?.value;
    this.genericService.login(params).subscribe({
      next: result => {
        if (result?.roles?.length > 0 && result.roles.map(ele => ele.code).indexOf('ROLE_ADMIN') != -1) {
          this.router.navigate(['/employees']);
        } else {
          this.router.navigate(['/profile']);
        }
      },
      error: error => {
        let errorMsg = error?.error?.message;
        if (error.error == null) {
          errorMsg = "Username or Password is not correct.";
        }
        this.notifier.error(errorMsg);
      }
    }
    );
  }

  register() {
    this.router.navigate(['/register']);
  }

}
