import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { ToasterService } from '../../../../toaster.service';
import{ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logindata=this.fb.group({
    "CompanyName" : ['',[Validators.required]],
    "Password" : ['',[Validators.required]]
  });
  constructor(private fb:FormBuilder,
              private srv:ServiceService,
              private rout:Router,
              private toast:ToasterService,
              private toastr : ToastrService
              ) { }

  ngOnInit() {
  }

  login()
  {
    this.srv.loginUser(this.logindata.value).subscribe((data)=> {
      if(data.status == 200)
      {
        localStorage.setItem('key',data.token);
        console.log(data);
        this.toast.successToaster(data.msg.str1,data.msg.str2);
        console.log("nav called")
        this.rout.navigate(['providers/dashboard']);
      }
      else{
        this.toast.errorToaster(data.msg.str1,data.msg.str2);        
      }
    });
  }

}
