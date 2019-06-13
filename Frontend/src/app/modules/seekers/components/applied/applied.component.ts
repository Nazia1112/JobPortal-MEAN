import { Component, OnInit } from '@angular/core';
import { SeekServiceService } from '../../services/seek-service.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-applied',
  templateUrl: './applied.component.html',
  styleUrls: ['./applied.component.scss']
})
export class AppliedComponent implements OnInit {

  details:Array<any>;

  constructor(private srv:SeekServiceService) { }

  ngOnInit() {
    this.getAppliedPost();
  }

  getAppliedPost()
  {
    this.srv.getappliedposts().subscribe((data=>{
      if(data.status == 200 )
      {
        this.details=data.data;
        console.log(data,"ads");
      }
    }))
  }


}
