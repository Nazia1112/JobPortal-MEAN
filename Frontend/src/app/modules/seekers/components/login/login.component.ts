import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeekServiceService } from '../../services/seek-service.service';
import { ToasterService } from '../../../../toaster.service';
import{ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  logindata=this.fb.group({
    "UserName" : ['',[Validators.required]],
    "Password" : ['',[Validators.required]]
  });

  constructor(private fb:FormBuilder,
              private srv:SeekServiceService,
              private rout:Router,
              private toast:ToasterService,
              private toastr: ToastrService
              ) { }

  ngOnInit() {
  }

  login()
  {
    this.srv.loginUser(this.logindata.value).subscribe((data)=>{
      if(data.status == 200)
      {
        this.toast.successToaster(data.msg.str1,data.msg.str2);
        this.rout.navigate(['']);
        
        window.localStorage.setItem('token',data.token);
        // window.location.reload();
        // this.toastr.success('Successfully Logged In');
      }
      else
      {
        this.toast.errorToaster(data.msg.str1,data.msg.str2);
      }
    })
  }


}
