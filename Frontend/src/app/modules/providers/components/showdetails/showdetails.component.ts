import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { MatDialog } from '@angular/material';
import { ShowresumeComponent } from '../showresume/showresume.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-showdetails',
  templateUrl: './showdetails.component.html',
  styleUrls: ['./showdetails.component.scss']
})
export class ShowdetailsComponent implements OnInit {


  details:Array<any>;



  constructor(public dialog:MatDialog,private srv:ServiceService) { }

  ngOnInit() {
    this.getAppliedUsers();
  } 

  getAppliedUsers()
  {
    this.srv.getappliedposts().subscribe((data=>{
      if(data.status == 200 )
      {
        this.details=data.data;
        console.log(data,"ads");
      }
    }))
  }

  showResume(resume:string)
  {
    console.log(resume);
    
    let dialogRef = this.dialog.open(ShowresumeComponent, {
      height: '600px',
      width: '700px',
      data: resume
    });
  }

}
