import { Component, OnInit } from '@angular/core';
import { SeekServiceService } from '../../services/seek-service.service';
import{ToastrService} from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ShowResumeComponent } from '../show-resume/show-resume.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  res: any;
  backendUrl: any;
  constructor(private srv: SeekServiceService, 
    private toast : ToastrService,
    public dialog: MatDialog) { }
  ngOnInit() {
    this.backendUrl = "http://localhost:3000";
    this.userinfo();
   
  }

  userinfo(){
    this.srv.userprofile().subscribe((res) => {
      console.log(res);
      this.res = res.data[0];
    })

  }

  editProduct(data) {

    let dialogRef = this.dialog.open(EditProfileComponent, {
      height: '500px',
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe((data) => {

      console.log(data);

      if (data != undefined) {
        this.srv.updateProfile(data).subscribe((res) => {

          if (res.status == 200) {
            this.toast.success('Updated Succesfully');
            this.userinfo();
          }
          else {
            this.toast.error('Error in updating');
          }
        });
      }
    });

  }

  showResume(resume:string)
  {
    console.log(resume);
    
    let dialogRef = this.dialog.open(ShowResumeComponent, {
      height: '600px',
      width: '700px',
      data: resume
    });
  }

}
