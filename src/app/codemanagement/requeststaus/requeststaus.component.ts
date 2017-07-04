import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-requeststaus',
  templateUrl: './requeststaus.component.html',
  styleUrls: ['./requeststaus.component.css']
})
export class RequeststausComponent implements OnInit {

  @Input()
  public status:string;

  constructor() {

  }

  ngOnInit() {
    if(this.status=="0"){
      this.status="refuse";
    }else if(this.status=="1"){
      this.status="requesting";
    }else if(this.status=="2"){
      this.status="In production";
    }else if(this.status=="3"){
      this.status="finish";
    }

  }

}
