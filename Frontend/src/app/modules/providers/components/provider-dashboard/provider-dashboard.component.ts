import { Component, OnInit } from '@angular/core';
import { PostJobComponent } from '../post-job/post-job.component';
import { MatDialog } from '@angular/material';
import { ServiceService } from '../../services/service.service';
import { ToasterService } from '../../../../toaster.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.scss']
})
export class ProviderDashboardComponent implements OnInit {

  postdetails:Array<any>=[];



  constructor(public dialog:MatDialog,
              private srv:ServiceService,
              private toast:ToasterService,
              private rout:Router) { }

  ngOnInit() {
    
      this.getPosts();
    
  }

  addJob()
  {
    let dialogRef = this.dialog.open(PostJobComponent, {
      height: '600px',
      width: '700px',
    });
    dialogRef.afterClosed().subscribe((data) => {
      if(data !== undefined)
      {
        this.srv.postAdd(data).subscribe((data)=>{
          if(data.status == 200)
          {
            this.toast.successToaster(data.msg.str1,data.msg.str2);
            console.log("success");
            this.getPosts();
          }
          else if(data.status == 403)
          {
            this.toast.errorToaster(data.msg.str1,data.msg.str2);       
            localStorage.clear();     
          }
          else{
            this.toast.errorToaster(data.msg.str1,data.msg.str2);

          }
        });
      }

    });
  }


  getPosts()
  {
    console.log("hello")
    this.srv.getproviderPost().subscribe((data)=>{
      if(data.status == 200)
      {
        this.postdetails=data.data;
        console.log(data.data);

      }
      else if(data.status == 403)
      {
        this.toast.errorToaster(data.msg.str1,data.msg.str2);
        localStorage.clear();
        this.rout.navigate(['providers/login']);


      }
    })
  }

  deletePost(data)
  {
    this.srv.deletePost(data).subscribe((res)=>{
      if(res.status == 200)
      {
        this.toast.successToaster(res.msg.str1,res.msg.str2);
        this.postdetails=res.data;
      }
      else if(res.status == 403 ){
        this.toast.errorToaster(res.msg.str1,res.msg.str2);
        localStorage.clear();
        this.rout.navigate(['providers/login']);
      }
    })
  }

}
