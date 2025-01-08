import { RegistrationComponent } from './user/registration/registration.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [
    {
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
