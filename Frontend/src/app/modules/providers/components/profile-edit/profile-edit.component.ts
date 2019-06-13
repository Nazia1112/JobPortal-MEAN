
import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';

import {MAT_DIALOG_DATA} from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { ProfileComponent } from '../profile/profile.component';
// import { ComProfile } from '../../../../constants/Provider-profile';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  editForm=this.fb.group({
    "CompanyName":['',[Validators.required]],
    "CompanyDomain":['',[Validators.required]],
    "Established":['',[Validators.required]],
    "Address":['',[Validators.required]],
    "EmployeeCount":['',[Validators.required]],
    "Email":['',[Validators.required]]
  });

  constructor(private fb:FormBuilder,private srv:ServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    public dialogRef : MatDialogRef<ProfileComponent>
  ) { }

  ngOnInit() {

    this.srv.getcomprofile(this.data).subscribe((res)=>{
      
      this.editForm.patchValue({
        CompanyName:res.CompanyName,
        CompanyDomain:res.CompanyDomain,
        Established:res.Established,
        Address:res.Address,
        EmployeeCount: res.EmployeeCount,
        Email: res.Email
      });


    })
  }

  cancel()
  {
    this.dialogRef.close();
  }
  submitHandler()
  {
    this.dialogRef.close(this.editForm.value);
  }

}
