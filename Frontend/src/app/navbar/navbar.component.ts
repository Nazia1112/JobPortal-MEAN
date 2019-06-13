import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../modules/providers/services/service.service';
import { ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showlogin:boolean=true;
  constructor(public srv : ServiceService, private toast: ToastrService) { }
  show:boolean=false;
  ngOnInit() {
  }

  Logout()
  {
    window.localStorage.clear();
    this.showlogin=true;
    this.toast.success('Logged Out Successfully');
  }


  
}
