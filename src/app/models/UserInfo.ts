/**
 * Created by ujste on 2017/6/6 0006.
 */
export class UserInfo{
  constructor(public id:number, public userId: string,public userName:string,
              public password:string,public email:string,public role:string,
              public status:string,public createTime:string,public updateTime:string,
              public createBy:string,public updateBy:string,public rememberMe:boolean){}

}
