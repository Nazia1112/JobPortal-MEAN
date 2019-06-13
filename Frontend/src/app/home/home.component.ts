import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../modules/providers/services/service.service';
import { SeekServiceService } from '../modules/seekers/services/seek-service.service';
import { Router } from '@angular/router';
import { ToasterService } from '../toaster.service';
import { Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  postdetails:Array<any>=[];
  searchdetails:Array<any>=[];
  show:boolean=true;
  searchdata=this.fb.group({
    "Search" : ['',[Validators.required]],
    
  });




  constructor(private srv:ServiceService,
              private fb:FormBuilder,
              private srvSeeker:SeekServiceService,
              private rout:Router,
              private toast:ToasterService, ) { }

  ngOnInit() {
    this.getData();
    
  }
  


  applyJob(id:String)
  {
    if(window.localStorage.getItem('token') !== null )
    {
      this.srvSeeker.applyPost(id).subscribe((data)=>{
        if(data.status == 200)
        {
          this.toast.successToaster(data.msg.str1,data.msg.str2);
          this.getData();

        }
        else if(data.status == 409)
        {
          this.toast.errorToaster(data.msg.str1,data.msg.str2);
        }
      })
    }
    else{
      this.rout.navigate(['/users/login']);
    }
  }


  getData()
  {
    this.srv.getallPosts().subscribe((data)=>{
      if(data.status == 200)
      {
        this.postdetails=data.data;
        console.log(this.postdetails);
      }
    })
  }

  view(id)
  {
    this.rout.navigateByUrl('/view/'+id);
  }

  Search()
  {
    console.log(this.searchdata.value);
    this.srv.search(this.searchdata.value).subscribe((data)=>{
      if(data.status == 200)
      {
        console.log("helo",data)
        this.searchdetails=data.data;
        let count=this.searchdetails.length;
        this.toast.successToaster(count +" Results Found","");
        this.show=false;
      }
      else if(data.status == 404)
      {
        this.toast.errorToaster("Not Found","");
      }
      else
      {
        this.toast.errorToaster("Not Found","");
        
      }
    })
  }

}
