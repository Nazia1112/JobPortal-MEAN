import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ServiceService } from '../modules/providers/services/service.service';
import { SeekServiceService } from '../modules/seekers/services/seek-service.service';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-viewmore',
  templateUrl: './viewmore.component.html',
  styleUrls: ['./viewmore.component.scss']
})
export class ViewmoreComponent implements OnInit {

  postdetails:any;
  
  id:String;
  constructor(private toast:ToasterService,private router:Router,private srv:ServiceService,private rout:ActivatedRoute,private srvSeeker:SeekServiceService,) { }

  ngOnInit() {
    this.id = this.rout.snapshot.paramMap.get("id");
    this.getData();
  }


  getData()
  {
    this.srv.getPost(this.id).subscribe((data)=>{
      if(data.status == 200)
      {
        console.log(data);
        this.postdetails=data.data;
        console.log(this.postdetails);
      }
    })
  }

  Back(){
    this.router.navigate(['/home']);
  }


  applyJob(id:String)
  {
    if(window.localStorage.getItem('token') !== null )
    {
      this.srvSeeker.applyPost(id).subscribe((data)=>{
        if(data.status == 200)
        {
          this.toast.successToaster(data.msg.str1,data.msg.str2);
          

        }
        else if(data.status == 409)
        {
          this.toast.errorToaster(data.msg.str1,data.msg.str2);
        }
      })
    }
    else{
      this.router.navigate(['/users/login']);
    }
  }



}
