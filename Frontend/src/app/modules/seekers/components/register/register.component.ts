import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SeekServiceService } from "../../services/seek-service.service";
import { Router } from '@angular/router';
import { ToasterService } from '../../../../toaster.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  selectedFile:File=null;
  fd=new FormData();

  Registerdata=this.fb.group({
    "FirstName":['',[Validators.required]],
    "LastName":['',[Validators.required]],
    "Email":['',[Validators.required]],
    "Phone":['',[Validators.required]],
    "Address":['',[Validators.required]],
    "UserName" : ['',[Validators.required]],
    "Password" : ['',[Validators.required]],
    "Skills": ['',[Validators.required]],
    "Resume" : ['',[Validators.required]],
    "Experience" : ['',[Validators.required]]

  });


  constructor(private fb:FormBuilder,
              private srv:SeekServiceService,
              private rout:Router,
              private toast:ToasterService) { }

  ngOnInit() {
  }
  onchangefile(event)
  {
    console.log(event);
    this.selectedFile=<File>event.target.files[0];
    
    
  }


  uploadFile()
  {
    console.log('Registerdata', this.Registerdata);
    this.fd.append('Resume',this.selectedFile,this.selectedFile.name);
    this.srv.saveFile(this.fd).subscribe((data)=>{
      if(data.status == 200)
      {
        this.toast.successToaster(data.msg.str1,data.msg.str2);
        this.Registerdata.patchValue({
          Resume:data.filename
        })
      }
    });
    
  }



  Register()
  {
    this.srv.saveUser(this.Registerdata.value).subscribe((data)=>{
      if(data.status == 200)
      {
        this.toast.successToaster(data.msg.str1,data.msg.str2);
        this.rout.navigate(['home']);
      }
    });  
  }

  
}
