import {Component, Input, OnInit} from '@angular/core';
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {flyIn} from "../../animations/fly-in";
import {RequestInfoService} from "../../services/request-info.service";
import {HiveResult} from "../../models/HiveResult";
import {RequestInfo} from "../../models/RequestInfo";
import {Http} from "@angular/http";
import {UserInfo} from "../../models/UserInfo";

@Component({
  selector: 'app-requesttagcomponent',
  templateUrl: './requesttagcomponent.component.html',
  styleUrls: ['./requesttagcomponent.component.scss'],
  animations: [
    flyIn
  ]
})
export class RequesttagcomponentComponent implements OnInit {

  @Input()
  public flag:string;

  public bool:boolean;
  public bool2:boolean;

  @Input()
  public rid:number;

  public requestInfo:RequestInfo;

  public downLoadPath:string;

  public hive:HiveResult;

  public downLoad:string;

  public zipUrl:string;
  userInfo:UserInfo;

  constructor(public router:Router,public http:Http,public requestService:RequestInfoService) { }

  ngOnInit() {
    if(!this.flag){
      this.bool = false;
      this.bool2 = true;
    }else{
      this.bool = true;
      if(this.flag=='3'){
        this.bool2 = false;
      }else{
        this.bool2 = true;
      }
    }
    let currentUser=localStorage.getItem('userInfo');
    this.userInfo = JSON.parse(currentUser);
    if(this.userInfo.role=='3'){
        this.bool = true;
    }
    this.requestService.getRequest(this.rid).subscribe(value =>{
      this.hive = value;
      this.requestInfo =  this.hive.data;
      this.downLoad = this.requestInfo.downloadLink;
    })
    //此处不知道如何获取访问路径，暂时硬编码
   this.downLoadPath = '/api/request/getDownload?requestId='+this.rid;
  }

  public approve(){
    let urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0] + "/" + "handlerequest?id=" + this.rid);
  }

  public getDownload(){
    this.requestService.getDownload(this.rid).subscribe();
  }

}
