
import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import { SeekServiceService } from '../../services/seek-service.service';
import { ToasterService } from '../../../../toaster.service';
import{ToastrService} from 'ngx-toastr';

import {MAT_DIALOG_DATA} from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { ProfileComponent } from '../profile/profile.component';
// import { ComProfile } from '../../../../constants/Provider-profile';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  selectedFile:File=null;
  fd=new FormData();
  editForm=this.fb.group({
    "FirstName":['',[Validators.required]],
    "LastName":['',[Validators.required]],
    "Email":['',[Validators.required]],
    "Phone":['',[Validators.required]],
    "Address":['',[Validators.required]],
    "UserName" : ['',[Validators.required]],
    "Skills": ['',[Validators.required]],
    "Resume" : ['',[Validators.required]],
    "Experience" : ['',[Validators.required]]

  });

  constructor(private fb:FormBuilder,private srv:SeekServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private toast:ToasterService,
    private toastr: ToastrService,
    public dialogRef : MatDialogRef<ProfileComponent>
  ) { }

  ngOnInit() {

    this.srv.getuserprofile(this.data).subscribe((res)=>{
      
      this.editForm.patchValue({
        FirstName:res.FirstName,
        LastName:res.LastName,
        Email:res.Email,
        Phone:res.Phone,
        Address: res.Address,
        UserName: res.UserName,
        Skills: res.Skills,
        Experience: res.Experience,
        Resume: res.Resume
      });


    })
  }
  onchangefile(event)
  {
    console.log(event);
    this.selectedFile=<File>event.target.files[0];
    
    
  }

  uploadFile()
  {
    console.log('editForm', this.editForm);
    this.fd.append('Resume',this.selectedFile,this.selectedFile.name);
    this.srv.saveFile(this.fd).subscribe((data)=>{
      if(data.status == 200)
      {
        // this.toast.successToaster(data.msg.str1,data.msg.str2);
        this.toastr.success('Resume Updated')
        this.editForm.patchValue({
          Resume:data.filename
        })
      }
      else{
        this.toastr.error('Problem Update Resume');
      }
    });
    
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
