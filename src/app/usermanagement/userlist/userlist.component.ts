import {Component, OnInit} from '@angular/core';
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree,ActivatedRoute} from "@angular/router";

import {UserInfoService} from "../../services/user-info.service";
import {Observable} from "rxjs/Observable";
import {flyIn} from "../../animations/fly-in";
import {FormBuilder, FormGroup} from "@angular/forms";
import {setInterval} from "timers";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  animations: [
   flyIn
  ]
})
export class UserlistComponent implements OnInit {

  formModel:FormGroup;
  json:Object;

  public numPages: number = 3;
  public maxSize: number = 5;

  public searchFlag:boolean = false;
  public totalItems: number = 0;
  public currentPage: number = 1;
  public smallnumPages: number = 5;
  public itemsPerPage:number=10;


  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {

    this.setPage(event.page);
    //smallnumPages
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    this.getPageInfo();
  }




  constructor(public userInfoService:UserInfoService,public router: Router) {

    // this.requestList=[
    //   new RequestInfo(1,"CQCC001-001",10000,"site manager","2017/05/26 16:05:04","requesting"),
    //   new RequestInfo(2,"CQCC001-002",10000,"site manager","2017/05/26 16:05:04","generating"),
    //   new RequestInfo(3,"CQCC001-003",10000,"site manager","2017/05/26 16:05:04","finish"),
    //   new RequestInfo(4,"CQCC001-004",10000,"site manager","2017/05/26 16:05:04","requesting"),
    //   new RequestInfo(5,"CQCC001-005",10000,"site manager","2017/05/26 16:05:04","rejected"),
    //
    // ];

  }
  public pageInfoOb:Observable<any>;
  public userList;
  // public requestList:<RequestInfo>;
  ngOnInit() {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      userName:[''],
      email:['']
    });
    this.getPageInfo();
  }

  public getPageInfo():void{
    this.pageInfoOb=this.userInfoService.getPageInfo(this.currentPage,this.itemsPerPage);
    this.pageInfoOb.subscribe(value=>{
        console.log(value);
        this.userList=value.data.rows;
        this.totalItems=value.data.total;
      },
      error =>{},
      ()=>{console.log('!!!!!!!!!!!')});

    console.log(JSON.stringify( this.userList));
  }

  public goToAdd(){
    this.router.navigateByUrl('/dashboard/adduser');
  }

  public goUpdate(id:number){
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    console.log("list:"+id);
    this.router.navigateByUrl(s[0]+"/"+"adduser?id="+id);
  }

  onSubmit(){
    this.searchFlag = true;
    setTimeout(() => {
      this.searchFlag=false;
    }, 3000);
    console.log(this.formModel.value);
    this.json = JSON.stringify({page:this.currentPage,rows:this.itemsPerPage,userName:this.formModel.value.userName,email:this.formModel.value.email});
    this.userInfoService.getList(this.json).subscribe(
      value=>{
        this.userList=value.data.rows;
        this.totalItems=value.data.total;
      }
    );
  }

}
