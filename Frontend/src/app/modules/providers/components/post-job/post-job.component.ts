import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material'
@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {


  Postdata: FormGroup;



  formErrors = {
    'JobTitle': '',
    'SkillsRequire': '',
    'Description': '',
    'Location': '',
    'ExperienceRequire': '',
    'Vacancies': '',
    'Package': ''


  };
  validationMessages = {
    'JobTitle': {
      'required': 'JobTitle is required.',
      'minlength': 'JobTitle must be at least 2 characters long.',
      'maxlength': 'JobTitle cannot be more than 25 characters long.'
    },
    'SkillsRequire': {
      'required': 'Skills is required.',
      'minlength': 'SkillsRequire must be at least 2 characters long.',
    },
    'Description': {
      'required': 'Description is required.',
    },
    'Location': {
      'required': 'Location is required.',
    },
    'ExperienceRequire': {
      'required': 'ExperienceRequire is required.',
      'maxlength': 'ExperienceRequire cannot be more than 2 digit long.'
    },
    'Vacancies': {
      'required': 'Vacancies is required.',
    },
    'Package': {
      'required': 'Package is required.',
    }
  };




  

  constructor(private fb:FormBuilder,
              private srv:ServiceService,
              private rout:Router,
              private dialogRef:MatDialogRef<PostJobComponent>
              ) {
                this.createForm();

               }

  ngOnInit() {
  }


  createForm()
  {
    this.Postdata=this.fb.group({
      "JobTitle":['',[Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      "SkillsRequire":['',[Validators.required,Validators.minLength(2)]],
      "Description":['',[Validators.required]],
      "ExperienceRequire":['',[Validators.required,Validators.maxLength(2)]],
      "Location":['',[Validators.required]],
      "Vacancies" : ['',[Validators.required]],
      "Package" : ['',[Validators.required]],
      "LastDate":['',[Validators.required]]
    });
    this.Postdata.valueChanges
        .subscribe(data => this.onValueChanged(data));
  
      this.onValueChanged();

  }



  onValueChanged(data?: any) {
    if (!this.Postdata) { return; }
    const form = this.Postdata;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }



  postData()
  {
    this.dialogRef.close(this.Postdata.value);
    
  }

  close()
  {
    this.dialogRef.close();
  }
  

  


}
