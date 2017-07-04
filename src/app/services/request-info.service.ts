import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {PageInfo} from "../models/PageInfo";
import {HiveHeaders} from "../models/HiveHeaders";
import 'rxjs/add/operator/map'
import {HiveResult} from "../models/HiveResult";
import {InterceptorService} from "ng2-interceptors";

@Injectable()
export class RequestInfoService {

  //requestList:Observable<RequestInfo[]>

  //requestInfo:RequestInfo;

  constructor(public http:Http) { }

  public getPageInfo(page:number,rows:number):Observable<PageInfo>{
    let body = JSON.stringify({ page:page, rows:rows });
    //HiveHeaders.G_HiveHeader.append('token','hive');
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/request/getList',body,options).map(res => res.json());
  }

  public getList(json:any):Observable<PageInfo>{
    let body = json;
    //HiveHeaders.G_HiveHeader.append('token','hive');
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/request/getList',body,options).map(res => res.json());
  }

  public handleData(requestInfo:RequestInfo):Observable<HiveResult>{
    let body = requestInfo;
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/request/buildRequest',body,options).map(res => res.json());
  }

  public handleStatus(rid:number,flag:string):Observable<HiveResult>{
    let body = JSON.stringify({requestId:rid,flag:flag});
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/request/dealRequest',body,options).map(res => res.json());
  }

  public getRequest(rid:number):Observable<HiveResult>{
    let body = JSON.stringify({requestId:rid});
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/request/getRequest',body,options).map(res => res.json());
  }

  public getDownload(rid:number):Observable<Object>{
    let body = JSON.stringify({requestId:rid});
    let headers = new Headers({ 'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post('/api/request/getDownload',body,options);
  }

}
