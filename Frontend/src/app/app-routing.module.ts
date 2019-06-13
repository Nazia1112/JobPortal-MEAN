import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewmoreComponent } from './viewmore/viewmore.component';

const routes: Routes = [
  {
    path:'users',loadChildren: './modules/seekers/seekers.module#SeekersModule'
  },
  {
    path:'providers',loadChildren: './modules/providers/providers.module#ProvidersModule'
  },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'',component:HomeComponent
  },
  {
    path:'view/:id',component:ViewmoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
