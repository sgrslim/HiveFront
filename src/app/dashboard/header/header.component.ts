import { Component, OnInit } from '@angular/core';
import {UserInfo} from "../../models/UserInfo";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName:string;

  userInfo:UserInfo;

  constructor() { }

  ngOnInit() {
    let currentUser=localStorage.getItem('userInfo');
    this.userInfo = JSON.parse(currentUser);
    this.userName = this.userInfo.userName;
  }

}
