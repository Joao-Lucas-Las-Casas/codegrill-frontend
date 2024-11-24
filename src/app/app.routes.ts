import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {AdminsPageComponent} from './components/admins-page/admins-page.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'update/:id', component: AdminsPageComponent, pathMatch: 'full'},
  {path: 'admin', component: AdminsPageComponent, pathMatch: 'full'},
];
