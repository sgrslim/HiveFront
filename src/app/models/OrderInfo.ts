/**
 * Created by moon on 2017/6/14.
 */
export class OrderInfo{
  constructor(public id:number,public customerSimpleName:string,
              public orderId:string,public orderCount:number,public allotCount:number,public codeFrom:string,
              public codeTo:string,public maxCode:string,public deliveryDate:string,
              public createTime:string,public updateTime:string,public createBy:string,public updateBy:string){}

}
