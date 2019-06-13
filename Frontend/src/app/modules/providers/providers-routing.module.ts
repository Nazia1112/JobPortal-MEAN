import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProviderDashboardComponent } from './components/provider-dashboard/provider-dashboard.component';
import { ShowdetailsComponent } from './components/showdetails/showdetails.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

const routes: Routes = [
  {
    path:'login', component:LoginComponent
  },
  {
    path:'register', component:RegisterComponent
  },
  {
    path:'dashboard', component:ProviderDashboardComponent
  },
  {
    path:'showdetails', component:ShowdetailsComponent
  },
  {
    path:'company-profile', component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
