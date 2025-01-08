# AUTH with JWT Samples

The repository haph762it/auth is a public project with the following characteristics:

Key Information

- Repository Name: auth
- Owner: haph762it
- Description: No description, website, or topics are provided.
- Languages Used:
  C# (62.1%)
  TypeScript (21.4%)
  HTML (10.6%)
  SCSS (3.1%)
  Dockerfile (2.8%)
- Structure
  The repository contains the following directories:

      - API/: Possibly backend logic or services related to authentication.

      - SPA/: Likely a Single Page Application, possibly the frontend of the authentication system.

- Potential Use Case
  Given the focus on "auth" and the usage of C# and TypeScript, it may implement:

A backend API in C# for user authentication and authorization.
A frontend SPA using TypeScript for managing user login interfaces.
Dockerfile indicating containerization support.

## Setup API

Dùng các thư viện như:

```console
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.7" />
	  <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="8.0.7" />
	  <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.7" />
	  <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.7">
		  <PrivateAssets>all</PrivateAssets>
		  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.6.2" />
```

1 số option của JWT

```c#
public static IServiceCollection ConfigureIdentityOptions(this IServiceCollection services)
        {
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.User.RequireUniqueEmail = true;
            });
            return services;
        }
```

Gọi ngoài Program

```c#
builder.Services.ConfigureIdentityOptions();
```

Get section

```c#
public static IServiceCollection AddAppConfig(this IServiceCollection services, IConfiguration config)
        {
            var setting = config.GetSection("AppSettings");
            services.Configure<AppSettings>(setting);
            return services;
        }

        // lấy giá trị từ json khi đã khởi tạo
        IOptions<AppSettings> appSettings
        var JWTSecret = appSettings.Value.JWTSecret
```

## Setup SPA

```$ tree
SPA
├── src
│   ├── app
│   │   ├── dashboard
│   │   │   ├── home.component.html //giao diện trang home
│   │   │   ├── home.component.scss //css cho trang home
│   │   │   └── home.component.ts //logic trang home
│   │   ├── model
│   │   │   └── auth.ts //dto map với request call api
│   │   ├── service
│   │   │   └── auth.service.ts //call api
│   │   ├── shared
│   │   │   └── auth.guard.ts //chứa các tiện ích dùng chung cho toàn bộ dự án
│   │   ├── user
│   │   │   ├── ...
│   │   │   └── child component user //chứa các component con của user
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── public
│   ├── app
│   ├── index.html
│   ├── main.ts
│   ├── style.scss
│   └── index.html
├── dir2
│   ├── file21.ext
│   ├── file22.ext
│   └── file23.ext
├── tsconfig.json
├── package.json
├── angular.json
├── ...
└── README.md

```

Auth dùng với CanActivateFn

```$ auth.guard.ts
//auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let local = localStorage.getItem('token');
  return local !== null ? true : inject(Router).createUrlTree(['/signin']);
};

```

Setup router

```$ app.routes.ts
//app.routes.ts
import { RegistrationComponent } from './user/registration/registration.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [{
    path: '', redirectTo: '/home', pathMatch: 'full'
},
{
    canActivate: [authGuard],
    path: 'home',
    component: HomeComponent,
},
{
    path: '',
    component: UserComponent,
    children: [
        {
            path: 'signin',
            component: LoginComponent,
        },
        {
            path: 'signup',
            component: RegistrationComponent,
        }
    ]
}];

```

Setup FormBuilder

```$ login.component.ts
//login.component.ts
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
...
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
...
constructor(){}
private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
```

Setup form

```$ login.component.html
//login.component.html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
    <div class="mb-3">
        <input class="form-control bg-body-secondary" type="text" placeholder="Email" formControlName="email">
        <div class="error-feedback" *ngIf="hasDisplayableError('email') && form.controls.email.hasError('required')">
            <p class="text-danger">Please enter your email address.</p>
        </div>
    </div>
    <div class="mb-3">
        <input class="form-control bg-body-secondary" type="password" placeholder="Password" formControlName="password"
            autocomplete="on">
        <div class="error-feedback"
            *ngIf="hasDisplayableError('password') && form.controls.password.hasError('required')">
            <p class="text-danger">Please enter your password.</p>
        </div>
    </div>
    <div class="mt-4">
        <button type="submit" class="btn btn-success w-100 rounded-3">
            Sign in
        </button>
    </div>
</form>
```
