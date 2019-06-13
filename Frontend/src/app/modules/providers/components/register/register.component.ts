import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../../toaster.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  Registerdata=this.fb.group({
    "CompanyName":['',[Validators.required]],
    "CompanyDomain":['',[Validators.required]],
    "Established":['',[Validators.required]],
    "Address":['',[Validators.required]],
    "EmployeeCount":['',[Validators.required]],
    "Password" : ['',[Validators.required]],
    "Email":['',[Validators.required]]
  });

  constructor(private fb:FormBuilder,
              private srv:ServiceService,
              private rout:Router,
              private toast:ToasterService,
              private spinnerService: Ng4LoadingSpinnerService,
              public dialog: MatDialog
              ) { }

  ngOnInit() {
  }
  Register()
  {
    // this.spinnerService.show();
    this.srv.addPostProvider(this.Registerdata.value).subscribe((data) => {
      if(data.status == 200)
      {
        this.toast.successToaster(data.msg.str1,data.msg.str2);        
        this.rout.navigate(['providers/login']);
      }
      // this.spinnerService.hide();
    });
  }

}
