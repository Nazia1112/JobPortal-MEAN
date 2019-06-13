import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'; 
import { DomSanitizer } from '@angular/platform-browser';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-showresume',
  templateUrl: './showresume.component.html',
  styleUrls: ['./showresume.component.scss']
})
export class ShowresumeComponent implements OnInit {

  rdata:string="http://localhost:3000/uploads/";
  urldata:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private sanitizer: DomSanitizer,
              private spinnerService: Ng4LoadingSpinnerService,
              public dialogRef : MatDialogRef<ShowresumeComponent>) {
    this.rdata+=data;
  }
  ngOnInit() {
    this.spinnerService.show();

  }

  photoURL()
  {
    // this.spinnerService.hide();

    return this.sanitizer.bypassSecurityTrustResourceUrl(this.rdata);
  }

  close()
  {
    this.dialogRef.close();
  }
}
