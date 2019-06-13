
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToasterService } from './toaster.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewmoreComponent } from './viewmore/viewmore.component';
import { ReactiveFormsModule } from '@angular/forms';
import{MatFormFieldModule, MatInputModule, MatDialogModule} from '@angular/material';

import { AgmCoreModule } from '@agm/core';

//Google Autocomplete
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ViewmoreComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    GooglePlaceModule,
    ToastrModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBIrGLvSyNXgq8XYmbMYke24oVRcLz_UX8'
    })
    
  ],
  exports:
  [GooglePlaceModule],
  providers: [ToasterService],
  bootstrap: [AppComponent],

})
export class AppModule { }
