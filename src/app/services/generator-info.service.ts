import { Injectable } from '@angular/core';
import {PageInfo} from "../models/PageInfo";
import {Http, RequestOptions,Headers} from "@angular/http";
import {HiveResult} from "../models/HiveResult";
import {Observable} from "rxjs/Observable";
import {HiveHeaders} from "../models/HiveHeaders";
import {Generator} from "../models/Generator";
import {InterceptorService} from "ng2-interceptors";

@Injectable()
export class GeneratorInfoService {

  public generator:Generator;

  constructor(public http:Http) { }

  public getPageInfo(page:number,rows:number):Observable<PageInfo>{
    let body = JSON.stringify({ page:page, rows:rows });
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/config/getList',body,options).map(res => res.json());
  }

  public getList(json:any):Observable<PageInfo>{
    let body = json;
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/config/getList',body,options).map(res => res.json());
  }

  public getGeneratorById(id:number):any{
    let body = JSON.stringify({"id":id});
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post("/api/config/getById",body,options).map(res => res.json());
  }

  public handleData(generator:Generator):Observable<HiveResult>{
    let body = generator;
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/config/handleData',body,options).map(res => res.json());
  }

}
