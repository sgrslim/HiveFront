/**
 * Created by moon on 2017/6/19.
 */
export class CustomerCode{
  constructor(public id:number, public customerId: number,public codeFrom:string,
              public customerSimpleName:string,public codeTo:string,public maxCode:string,
              public createTime:string,public updateTime:string,
              public createBy:string,public updateBy:string){}

}
