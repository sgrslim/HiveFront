import { Component, OnInit } from '@angular/core';
import {GeneratorInfoService} from "../../services/generator-info.service";
import {Observable} from "rxjs/Observable";
import {flyIn} from "../../animations/fly-in";
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PageInfo} from "../../models/PageInfo";


@Component({
  selector: 'app-generatorlist',
  templateUrl: './generatorlist.component.html',
  styleUrls: ['./generatorlist.component.css'],
  animations: [
    flyIn
  ]
})
export class GeneratorlistComponent implements OnInit {

  formModel:FormGroup;

  public numPages: number = 3;
  public maxSize: number = 5;

  info:PageInfo;
  searchFlag:boolean=false;


  public totalItems: number = 0;
  public currentPage: number = 1;
  public smallnumPages: number = 5;
  public itemsPerPage:number=15;


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




  constructor(public generatorInfoService:GeneratorInfoService,public router:Router) {


  }
  public pageInfoOb:Observable<any>;
  public generatorList;
  ngOnInit() {
    this.getPageInfo();
    let fb = new FormBuilder();
    this.formModel = fb.group({
      customerSimpleName:['']
    })

  }

  public getPageInfo():void{
    this.pageInfoOb=this.generatorInfoService.getPageInfo(this.currentPage,this.itemsPerPage);
    this.pageInfoOb.subscribe(value=>{
        console.log(value);
        this.generatorList=value.rows;
        this.totalItems=value.total;
      },
      error =>{},
      ()=>{console.log('!!!!!!!!!!!')});

    console.log(JSON.stringify( this.generatorList));
  }

  public goToAdd():void{
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0]+"/"+"addGenerator");
  }

  public goUpdate(id:number):void{
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    console.log("list:"+id);
    this.router.navigateByUrl(s[0]+"/"+"addGenerator?id="+id);
  }

  public onSubmit():void{
    this.searchFlag = true;
    setTimeout(() => {
      this.searchFlag=false;
    }, 3000);
   let json = JSON.stringify({page:this.currentPage,rows:this.itemsPerPage,customerSimpleName:this.formModel.value.customerSimpleName});
    this.pageInfoOb=this.generatorInfoService.getList(json);
    this.pageInfoOb.subscribe(
     value=>{
       this.generatorList = value.rows;
       this.totalItems=value.totalItems;
     }
   )
  }

}
