import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'; 
import { DomSanitizer } from '@angular/platform-browser';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-show-resume',
  templateUrl: './show-resume.component.html',
  styleUrls: ['./show-resume.component.scss']
})
export class ShowResumeComponent implements OnInit {

  rdata:string="http://localhost:3000/uploads/";
  urldata:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private sanitizer: DomSanitizer,
              private spinnerService: Ng4LoadingSpinnerService,
              public dialogRef : MatDialogRef<ShowResumeComponent>) {
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
