import { Component, OnInit } from '@angular/core';

import {OrderInfoService} from "../../services/order-info.service";
import {Observable} from "rxjs/Observable";
import {flyIn} from "../../animations/fly-in";
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css'],
  animations: [
    flyIn
  ]
})
export class OrderlistComponent implements OnInit {


  public numPages: number = 3;
  public maxSize: number = 5;
  public totalItems: number = 0;
  public currentPage: number = 1;
  public smallnumPages: number = 5;
  public itemsPerPage:number=15;

  public searchFlag:boolean=false;

  formModel:FormGroup;
  json:any;

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




  constructor(public orderInfoService:OrderInfoService,public router:Router) {

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
  public orderList;
  // public requestList:<RequestInfo>;
  ngOnInit() {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      'customerSimpleName':'',
      'orderId':''
    });
    this.getPageInfo();
  }

  public getPageInfo():void{
    this.pageInfoOb=this.orderInfoService.getPageInfo(this.currentPage,this.itemsPerPage);
    this.pageInfoOb.subscribe(value=>{
        console.log(value);
        this.orderList=value.data.rows;
        this.totalItems=value.data.total;
      },
      error =>{},
      ()=>{console.log('!!!!!!!!!!!')});

    console.log(JSON.stringify( this.orderList));
  }

  public goToAdd():void{
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0]+"/"+"addOrder");
  }

  public goUpdate(id:number):void{
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    console.log("list:"+id);
    this.router.navigateByUrl(s[0]+"/"+"addOrder?id="+id);
  }

  public onSubmit():void{
    this.searchFlag = true;
    setTimeout(() => {
      this.searchFlag=false;
    }, 3000);
    this.json = JSON.stringify({page:this.currentPage,rows:this.itemsPerPage,customerSimpleName:this.formModel.value.customerSimpleName,orderId:this.formModel.value.orderId});
    this.pageInfoOb = this.orderInfoService.getList(this.json);
    this.pageInfoOb.subscribe(
      value=>{
        console.log(value);
        this.orderList = value.data.rows;
        this.totalItems = value.data.total;
      }
    );
  }

}
