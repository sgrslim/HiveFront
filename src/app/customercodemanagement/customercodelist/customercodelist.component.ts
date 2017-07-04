import { Component, OnInit } from '@angular/core';
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {CustomercodeInfoService} from "../../services/customercode-info.service";
import {Observable} from "rxjs/Observable";
import {flyIn} from "../../animations/fly-in";
import {CustomerCode} from "../../models/CustomerCode";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-customercodelist',
  templateUrl: './customercodelist.component.html',
  styleUrls: ['./customercodelist.component.scss'],
  animations: [
    flyIn
  ]
})
export class CustomercodelistComponent implements OnInit {

  public numPages: number = 3;
  public maxSize: number = 5;




  public totalItems: number = 0;
  public currentPage: number = 1;
  public smallnumPages: number = 5;
  public itemsPerPage:number=15;

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

  formModel:FormGroup;


  constructor(public customerCodeService:CustomercodeInfoService,public router:Router) {


  }
  public pageInfoOb:Observable<any>;


  public customerCodeList;
  ngOnInit() {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      customerSimpleName:''
    })
    this.getPageInfo();
  }

  public getPageInfo():void{
    this.pageInfoOb=this.customerCodeService.getPageInfo(this.currentPage,this.itemsPerPage);
    this.pageInfoOb.subscribe(value=>{
        console.log(value);
        this.customerCodeList=value.data.rows;
        this.totalItems=value.total;
      },
      error =>{},
      ()=>{console.log('!!!!!!!!!!!')});

    console.log(JSON.stringify( this.customerCodeList));
  }

  public goToAdd():void{
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0]+"/"+"addcustomercode");
  }

  public goUpdate(id:number):void{
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    console.log("list:"+id);
    this.router.navigateByUrl(s[0]+"/"+"addGenerator?id="+id);
  }

  onSubmit(){
    this.searchFlag = true;
    setTimeout(() => {
      this.searchFlag=false;
    }, 3000);
    console.log(this.formModel.value);
    let json = JSON.stringify({page:this.currentPage,rows:this.itemsPerPage,customerSimpleName:this.formModel.value.customerSimpleName});
    this.pageInfoOb = this.customerCodeService.getList(json);
    this.pageInfoOb.subscribe(
      value=>{
        if(value.data){
          this.customerCodeList=value.data.rows;
          this.totalItems=value.data.total;
        }else{
          this.customerCodeList = null;
          this.totalItems=null;
        }
      }
    );
  }


}
