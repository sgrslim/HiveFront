import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers} from "@angular/http";
import {HiveResult} from "../models/HiveResult";
import {Observable} from "rxjs/Observable";
import {HiveHeaders} from "../models/HiveHeaders";
import {UserInfo} from "../models/UserInfo";
import {PageInfo} from "../models/PageInfo";
import {InterceptorService} from "ng2-interceptors";

@Injectable()
export class UserInfoService {

  constructor(public http:Http  ) { }

  public login(email:string,password:string):Observable<HiveResult>{
    let body = JSON.stringify({ userId:email, password:password });
    // let headers = new Headers({ 'content-type': 'application/json' });
    // let options = new RequestOptions({headers: headers});
    //HiveHeaders.G_HiveHeader.append('token','hive');

    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    //let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
    //let options = new RequestOptions({headers: headers});
    return this.http.post('/ssoApi/user/login', body, options).map(res => res.json());
  }

  public getByToken(token:string):Observable<HiveResult>{
    let body = JSON.stringify({ token:token});
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    //let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
    //let options = new RequestOptions({headers: headers});
    return this.http.post('/api/user/getByToken', body, options).map(res => res.json());
  }

  public register(userInfo:UserInfo):Observable<HiveResult>{
    let body = userInfo;
    // let headers = new Headers({ 'content-type': 'application/json' });
    // let options = new RequestOptions({headers: headers});
    //HiveHeaders.G_HiveHeader.append('token','hive');

    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    //let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
    //let options = new RequestOptions({headers: headers});
    return this.http.post('/ssoApi/user/register', body, options).map(res => res.json());
  }

  public updateInfo(userInfo:UserInfo):Observable<HiveResult>{
    let body = userInfo;
    // let headers = new Headers({ 'content-type': 'application/json' });
    // let options = new RequestOptions({headers: headers});
    //HiveHeaders.G_HiveHeader.append('token','hive');

    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    //let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
    //let options = new RequestOptions({headers: headers});
    return this.http.post('/api/user/update', body, options).map(res => res.json());
  }

  public getList(json:any):Observable<HiveResult>{
    let body = json;
    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    return this.http.post('/api/user/findAllUser', body, options).map(res => res.json());
  }

  public getPageInfo(page:number,rows:number):Observable<PageInfo>{
    let body = JSON.stringify({ page:page, rows:rows });
    // let headers = new Headers({ 'content-type': 'application/json' });
    // let options = new RequestOptions({headers: headers});
    //HiveHeaders.G_HiveHeader.append('token','hive');

    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    //let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
    //let options = new RequestOptions({headers: headers});
    return this.http.post('/api/user/findAllUser',body,options).map(res => res.json());
  }

  public getUserId(id:number):Observable<HiveResult>{
    let body = JSON.stringify({ id:id});
    // let headers = new Headers({ 'content-type': 'application/json' });
    // let options = new RequestOptions({headers: headers});
    //HiveHeaders.G_HiveHeader.append('token','hive');

    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    //let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
    //let options = new RequestOptions({headers: headers});
    return this.http.post('/api/user/findUserById',body,options).map(res => res.json());
  }

  public checkEmail(emailValue:string):Observable<HiveResult>{
    let body = JSON.stringify({ email:emailValue});
    // let headers = new Headers({ 'content-type': 'application/json' });
    // let options = new RequestOptions({headers: headers});
    //HiveHeaders.G_HiveHeader.append('token','hive');

    let options = new RequestOptions({headers: HiveHeaders.G_HiveHeader});
    //let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
    //let options = new RequestOptions({headers: headers});
    return this.http.post('/api/user/checkEmail',body,options).map(res => res.json());
  }

}
