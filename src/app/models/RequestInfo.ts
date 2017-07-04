/**
 * Created by ujste on 2017/5/31 0031.
 */

export class RequestInfo{
  constructor(public requestId: number, public orderId: string, public requestCount: number,public productCount:number,
              public codeFrom: string, public codeTo: string, public status: string,public rate:number,
              public manager:string, public approver:string, public downloadLink:string,
              public createTime:string, public createBy:string, public updateTime:string,public updateBy:string){}

}

