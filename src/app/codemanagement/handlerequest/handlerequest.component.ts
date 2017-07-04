import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {RequestInfo} from "../../models/RequestInfo";
import {RequestInfoService} from "../../services/request-info.service";

@Component({
  selector: 'app-handlerequest',
  templateUrl: './handlerequest.component.html',
  styleUrls: ['./handlerequest.component.scss']
})
export class HandlerequestComponent implements OnInit {

  constructor(public router:Router,public requestService:RequestInfoService,public activatedRoute:ActivatedRoute) { }

  public requestInfo:RequestInfo;

  public rid:number;

  ngOnInit() {
    this.rid = this.activatedRoute.snapshot.queryParams["id"];
    console.log(this.rid);
    this.getRequest(this.rid);
  }

  public getRequest(rid:number):void{
      this.requestService.getRequest(rid).subscribe(
        value=>{
          /*this.hiveResult = value;*/
          this.requestInfo = value.data;
          console.log(value);
        }
      );
  }

  public backList():void{
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0]+"/"+"requestlist");
  }

  public approve():void{
    this.requestService.handleStatus(this.rid,'true').subscribe(
      value =>{
        if(value.status==200){
          let urlTree:UrlTree=this.router.parseUrl(this.router.url);
          const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
          const s: UrlSegment[] = g.segments;
          this.router.navigateByUrl(s[0]+"/"+"requestlist");
        }
      }
    )
  }

  public refuse():void{
    this.requestService.handleStatus(this.rid,'false').subscribe(
      value =>{
        if(value.status==200){
          let urlTree:UrlTree=this.router.parseUrl(this.router.url);
          const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
          const s: UrlSegment[] = g.segments;
          this.router.navigateByUrl(s[0]+"/"+"requestlist");
        }
      }
    )
  }

}
