import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material';

import { SeekersRoutingModule } from './seekers-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ShowResumeComponent } from './components/show-resume/show-resume.component';
import { AppliedComponent } from './components/applied/applied.component';
@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    ShowResumeComponent,
    AppliedComponent

  ],
  imports: [
    CommonModule,
    SeekersRoutingModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  entryComponents: [EditProfileComponent, ShowResumeComponent]

})
export class SeekersModule { }
