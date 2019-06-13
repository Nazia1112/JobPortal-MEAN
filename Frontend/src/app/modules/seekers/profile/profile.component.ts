import { Component, OnInit } from '@angular/core';
import { SeekServiceService } from '../services/seek-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  res: any
  constructor(private srv: SeekServiceService) { }
  ngOnInit() {
    this.srv.userprofile().subscribe((res) => {
      console.log(res);
      this.res = res.data[0];
    })
  }

}
