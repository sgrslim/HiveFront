import {Component, OnInit} from '@angular/core';

import {CustomerInfoService} from "../../services/customer-info.service";
import {Observable} from "rxjs/Observable";
import {flyIn} from "../../animations/fly-in";
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css'],
  animations: [
    flyIn
  ]
})
export class CustomerlistComponent implements OnInit {

  formModel:FormGroup;
  json:any;

  public numPages: number = 3;
  public maxSize: number = 5;


  public totalItems: number = 0;
  public currentPage: number = 1;
  public smallnumPages: number = 5;
  public itemsPerPage: number = 10;
  public searchFlag:boolean=false;

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


  constructor(public customerInfoService: CustomerInfoService, public router: Router) {




  }

  public pageInfoOb: Observable<any>;
  public customerList;

  ngOnInit() {

    this.getPageInfo();

    let fb = new FormBuilder();
    this.formModel = fb.group({
      customerSimpleName:['']
    });
  }

  public getPageInfo(): void {
    this.pageInfoOb = this.customerInfoService.getPageInfo(this.currentPage, this.itemsPerPage);
    this.pageInfoOb.subscribe(value => {
        console.log(value);
        this.customerList = value.data.rows;
        this.totalItems = value.data.total;
      },
      error => {
      },
      () => {
        console.log('!!!!!!!!!!!')
      });

    console.log(JSON.stringify(this.customerList));
  }

  public goToAdd(): void {
    let urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0] + "/" + "addcustomer");
  }

  public goUpdate(id: number): void {
    let urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    console.log("list:" + id);
    this.router.navigateByUrl(s[0] + "/" + "addcustomer?id=" + id);
  }

  public onSubmit():void{
    this.searchFlag = true;
    setTimeout(() => {
      this.searchFlag=false;
    }, 3000);
    this.json = JSON.stringify({page:this.currentPage,rows:this.itemsPerPage,customerSimpleName:this.formModel.value.customerSimpleName});
    this.customerInfoService.getList(this.json).subscribe(
      value=>{
        console.log(value);
        this.customerList = value.data.rows;
        this.totalItems = value.data.total;
      }
    );
  }
}
