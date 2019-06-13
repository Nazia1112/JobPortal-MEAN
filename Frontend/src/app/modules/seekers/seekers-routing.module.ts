import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppliedComponent } from './components/applied/applied.component';


const routes: Routes = [
  {
    path:'login', component:LoginComponent,
  },
  {
    path:'Register', component:RegisterComponent
  },
  {
    path:'profile',component:ProfileComponent
  },
  {
    path:'applied-in-companies',component:AppliedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeekersRoutingModule { }
