import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IUserRegistrationModel, ResponseRegistration } from '../../model/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  isSubmitted: boolean = false;
  constructor(private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }
  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    fullName: ['', Validators.required],
  });
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      let dataRegister: IUserRegistrationModel = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        fullName: this.form.controls.fullName.value,

      };
      this.authService.signup(dataRegister).subscribe({
        next: (res: ResponseRegistration) => {
          if (res.succeeded) {
            this.toastr.success(`Register succeeded with ${this.form.controls.email.value}`, 'Register succeeded')
            this.router.navigateByUrl('/signin');
          } else {
            this.toastr.error(res.errors[0]?.description ?? 'There was an error while registering.', 'Register failed')
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == 400)
            this.toastr.error(err.error?.errors[0].description ?? 'There was an error while registering.', 'Register failed')
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
