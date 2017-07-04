import {Component, OnInit} from '@angular/core';

import {RequestInfoService} from "../../services/request-info.service";
import {Observable} from "rxjs/Observable";
import {flyIn} from "../../animations/fly-in";
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-requestlist',
  templateUrl: './requestlist.component.html',
  styleUrls: ['./requestlist.component.scss'],
  animations: [
    flyIn
  ]
})
export class RequestlistComponent implements OnInit {


  public numPages: number = 3;
  public maxSize: number = 5;

  public totalItems: number = 0;
  public currentPage: number = 1;
  public smallnumPages: number = 5;
  public itemsPerPage:number=15;

  formModel:FormGroup;
  json:any;

  public okButton:boolean = false;

  public searchFlag:boolean = false;
  refreshFlag:boolean=false;

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  okFlag:boolean=false;

  public pageChanged(event: any): void {

    this.setPage(event.page);
    //smallnumPages
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    this.getPageInfo();
  }




  constructor(public requestInfoService:RequestInfoService, public router: Router) {


  }
  public pageInfoOb:Observable<any>;
  public requestList;
  // public requestList:<RequestInfo>;
  ngOnInit() {
    let fb = new FormBuilder();
    this.formModel=fb.group({
      'orderId':''
    })
    this.getPageInfo();
  }

  public getPageInfo():void{
    this.pageInfoOb=this.requestInfoService.getPageInfo(this.currentPage,this.itemsPerPage);
    this.pageInfoOb.subscribe(value=>{
      console.log(value);
      this.requestList=value.data.rows;
      this.totalItems=value.data.total;
    },
      error =>{},
      ()=>{console.log('!!!!!!!!!!!')});

    console.log(JSON.stringify( this.requestList));
  }

  public goToAdd(): void {
    let urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    console.log(s[0]);
    this.router.navigateByUrl(s[0] + "/" + "addrequest");
  }

  public goUpdate(id: number): void {
    let urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    console.log("list:" + id);
    this.router.navigateByUrl(s[0] + "/" + "addcustomer?id=" + id);
  }

  public approve(rid:number){
    this.requestInfoService.handleStatus(rid,'true').subscribe();
  }

  public onSubmit():void{
    this.searchFlag = true;
    setTimeout(() => {
      this.searchFlag=false;
    }, 3000);
    this.json = JSON.stringify({page:this.currentPage,rows:this.itemsPerPage,orderId:this.formModel.value.orderId});
    this.pageInfoOb = this.requestInfoService.getList(this.json);
    this.pageInfoOb.subscribe(
      value=>{
        console.log(value);
        this.requestList = value.data.rows;
        this.totalItems = value.data.total;
      }
    );
  }

  public  refresh():void{
    this.refreshFlag=true;
    this.getPageInfo();
    setTimeout(() => {
      this.refreshFlag=false;
    }, 3000);
  }
}

