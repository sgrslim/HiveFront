import { Injectable } from '@angular/core';
import {PageInfo} from "../models/PageInfo";
import {Http, RequestOptions,Headers} from "@angular/http";
import {HiveResult} from "../models/HiveResult";
import {Observable} from "rxjs/Observable";
import {HiveHeaders} from "../models/HiveHeaders";
import {Customer} from "../models/Customer";
import {InterceptorService} from "ng2-interceptors";

@Injectable()
export class CustomerInfoService {

  constructor(public http:Http ) { }

  public customer:Customer;

  public getPageInfo(page:number,rows:number):Observable<PageInfo>{
    let body = JSON.stringify({ page:page, rows:rows });
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/customer/customerList',body,options).map(res => res.json());
  }

  public getList(json:any):Observable<any>{
    let body = json;
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/customer/customerList',body,options).map(res => res.json());
  }

  public getCustomerById(id:number):any{
    let body = JSON.stringify({"id":id});
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
   return this.http.post("/api/customer/getById",body,options).map(res => res.json());
  }

  public handleData(customer:Customer):Observable<HiveResult>{
    let body = customer;
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/customer/handleCustomer',body,options).map(res => res.json());
  }
}
