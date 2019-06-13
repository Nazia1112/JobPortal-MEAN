import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toasterservice: ToastrService) { }

  successToaster(str1, str2){
    this.toasterservice.success(str1, str2);
  }

  errorToaster(msg1,msg2) {
    this.toasterservice.error(msg1,msg2);
  }

}
