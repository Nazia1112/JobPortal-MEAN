import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProvidersRoutingModule } from './providers-routing.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { ProviderDashboardComponent } from './components/provider-dashboard/provider-dashboard.component';
import { MatDialogModule } from '@angular/material';
import { ShowdetailsComponent } from './components/showdetails/showdetails.component';
import { ShowresumeComponent } from './components/showresume/showresume.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, PostJobComponent, ProviderDashboardComponent, ShowdetailsComponent, ShowresumeComponent, ProfileComponent, ProfileEditComponent],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  entryComponents: [PostJobComponent,ShowresumeComponent,ProfileEditComponent]
})
export class ProvidersModule { }
