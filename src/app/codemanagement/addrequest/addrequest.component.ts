import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {email} from "../../validators/validator";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute,PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {HiveResult} from "../../models/HiveResult";
import {RequestInfoService} from "../../services/request-info.service";
import {RequestInfo} from "../../models/RequestInfo";

@Component({
  selector: 'app-addrequest',
  templateUrl: './addrequest.component.html',
  styleUrls: ['./addrequest.component.scss']
})
export class AddrequestComponent implements OnInit {
  formModel:FormGroup;
  //=new Customer(0,'','','','','','','','','')
  requestInfo:RequestInfo;

  customerId:number;

  hiveResult:HiveResult;

  orderIdError:any;

  productFlag:string;

  myData:any;

  auto:any;

  rateFlag:any;

  rateResult:any;

  hiddenOrderId:any;

  requestCountResult:number;

  searchInput:FormControl=new FormControl();

  rateInput:FormControl=new FormControl();

  public formErrors = {
    'orderId':'',
    'productCount':''
  }

  public validationMessages={
    'orderId':{
      'required':'Customer name cannot be empty'
    },
    'productCount':{
      'required':'requestCount cannot be empty',
      'min':'productCount is more than 1',
      'max':'productCount is not more than 999999999'
    }
  }

  myItems = [
    'apple',
    'tiger',
    'disc',
    'shirt',
    'storm'
  ];
  selectedItem: string = '';



  constructor(public router:Router,public routeInfo:ActivatedRoute,public requestService:RequestInfoService) {
    this.searchInput.valueChanges.debounceTime(500).subscribe(
      stockCode=>this.mySource()
    );
    this.rateInput.valueChanges.debounceTime(500).subscribe(
      (data)=>this.changeRequestCount(data)
    );
  }

  ngOnInit() {
    //响应式表单，需要构建表单
    let fb = new FormBuilder();
    this.formModel = fb.group({
      requestId:[''],
      orderId:[''],
      productCount:['',[Validators.required,Validators.min(1),Validators.max(99999999)]],
      rate:[''],
      requestCount:[''],
    });
    this.formModel.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

  }

  public backList():void{
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0]+"/"+"requestlist");
  }

  public onSubmit():void{
    console.log(this.formModel.value);
    if(this.rateFlag){
      return;
    }
    this.requestInfo = this.formModel.value;
    console.log(this.requestInfo);
    this.formModel.reset({
      orderId:this.hiddenOrderId,
      requestCount:this.requestCountResult,
      productCount:this.requestInfo.productCount,
      rate:this.rateResult
    })
    if(this.formModel.valid){ //校验通过
      this.requestService.handleData(this.formModel.value).subscribe(
        value=>{
          this.hiveResult = value;
          if(this.hiveResult.status==200){
            this.backList();
          }else{
            this.orderIdError = this.hiveResult.msg;
          }
        }
      );
    }
  }

  onValueChanged(data?: any) {
    if (!this.formModel) {
      return;
    }
    const form = this.formModel;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  getOrderInfo(value:string){
    console.log(value);
    if(value=='1'){
      console.log('aaaa');
    }else if(value=='2'){
    }
  }

  mySource(){
    console.log('didid');
    this.myData = [1,2,3];
  }

  onItemSelected(event) {
    this.selectedItem = event;
    this.hiddenOrderId = event;

  }

  changeRequestCount(data){
    this.rateFlag = '';
    var re = /^1+(?:\.\d{1,2})?$/;
    if(!re.test(data)){
      this.rateFlag ='Inputs between 1 and 2 and up to two decimal places';
      this.requestCountResult = null;
      return false ;
    }
    this.rateResult = data;
    let number =  this.formModel.value.productCount * data;
    console.log(number);
    this.requestCountResult = Math.ceil(number);
  }

}
