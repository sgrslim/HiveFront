import { Injectable } from '@angular/core';
import {PageInfo} from "../models/PageInfo";
import {Http, RequestOptions,Headers} from "@angular/http";
import {HiveResult} from "../models/HiveResult";
import {Observable} from "rxjs/Observable";
import {HiveHeaders} from "../models/HiveHeaders";
import {OrderInfo} from "../models/OrderInfo";
import {InterceptorService} from "ng2-interceptors";

@Injectable()
export class OrderInfoService {
  public orderInfo:OrderInfo;

  constructor(public http:Http) { }

  public getPageInfo(page:number,rows:number):Observable<PageInfo>{
    let body = JSON.stringify({ page:page, rows:rows });
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/order/getList',body,options).map(res => res.json());
  }

  public getList(json:any):Observable<PageInfo>{
    let body = json;
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/order/getList',body,options).map(res => res.json());
  }

  public getAllBySearch(json:any):any{
    let body = json;
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/order/getAllBySearch',body,options).map(res => res.json());
  }


  public getOrderById(id:number):any{
    let body = JSON.stringify({"id":id});

    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post("/api/order/getById",body,options).map(res => res.json());
  }

  public handleData(orderInfo:OrderInfo):Observable<HiveResult>{
    let body = orderInfo;
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    if(orderInfo.id){
      return this.http.post('/api/order/handleOrder',body,options).map(res => res.json());
    }else{
      return this.http.post('/api/order/buildOrder',body,options).map(res => res.json());
    }

  }

  public getAutoCode(customerSimpleName:string):Observable<HiveResult>{
    let body = JSON.stringify({"customerSimpleName":customerSimpleName});
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/order/autoOrderCode',body,options).map(res => res.json());
  }
}
