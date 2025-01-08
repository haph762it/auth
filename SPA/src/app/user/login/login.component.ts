import { ILoginModel } from './../../model/auth';
import { AuthService } from './../../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isSubmitted: boolean = false;
  constructor(private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }
  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      let dataLogin: ILoginModel = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value
      };
      this.authService.signin(dataLogin).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/home');
        },
        error: err => {
          if (err.status == 400)
            this.toastr.error('Incorrect email or password.', 'Login failed')
          else
            console.log('error during login:\n', err);

        }
      })
    }
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
  }
}
