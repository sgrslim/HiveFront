import { Injectable } from '@angular/core';
import {PageInfo} from "../models/PageInfo";
import {Observable} from "rxjs/Observable";
import {Http, RequestOptions} from "@angular/http";
import {HiveResult} from "../models/HiveResult";
import {CustomerCode} from "../models/CustomerCode";
import {HiveHeaders} from "../models/HiveHeaders";
import {InterceptorService} from "ng2-interceptors";

@Injectable()
export class CustomercodeInfoService {

  public customercode:CustomerCode;

  constructor(public http:Http ) { }

  public getPageInfo(page:number,rows:number):Observable<PageInfo>{
    let body = JSON.stringify({ page:page, rows:rows });
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/code/getList',body,options).map(res => res.json());
  }

  public getList(json:any):Observable<PageInfo>{
    let body = json;
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/code/getList',body,options).map(res => res.json());
  }

  public getGeneratorById(id:number):any{
    let body = JSON.stringify({"id":id});

    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post("/api/config/getById",body,options).map(res => res.json());
  }

  public handleData(map:Map<string,object>):Observable<HiveResult>{
    let body = map;
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/customer/requestCodeNumber',body,options).map(res => res.json());
  }


}
