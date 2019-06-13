import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { ComProfile } from '../../../../constants/Provider-profile';
import {ToastrService} from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  response: ComProfile[];

  res: any
  constructor(private srv: ServiceService,
    private toast : ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    public dialog: MatDialog) { }
  ngOnInit() {
    this.companyinfo();
    
  }
  companyinfo()
  {
    this.srv.companyprofile().subscribe((res) => {
      console.log(res);
      this.res = res.data[0];
    })
  }


  editProduct(data) {

    let dialogRef = this.dialog.open(ProfileEditComponent, {
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
            this.companyinfo();
          }
          else {
            this.toast.error('Error in updating');
          }
        });
      }
    });

  }
}
