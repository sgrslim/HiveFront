import {AfterViewInit, Component, EventEmitter, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute,PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {HiveResult} from "../../models/HiveResult";
import {OrderInfo} from "../../models/OrderInfo";
import {OrderInfoService} from "../../services/order-info.service";
import DateTimeFormat = Intl.DateTimeFormat;
import {flyIn} from "../../animations/fly-in";
import {DateFormatter} from "ngx-bootstrap";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-addorder',
  providers:[DatePipe],
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css'],
  animations: [
    flyIn
  ]
})
export class AddorderComponent implements OnInit,AfterViewInit {

  formModel:FormGroup;
  //=new Customer(0,'','','','','','','','','')
  orderInfo:OrderInfo

  id:number;

  errorMsg:string;

  btFlag:boolean = false;

  submitGetOtderId:boolean = true;
  checkCustomerName:string;

  orderId:FormControl;
  //orderId
  autoOrderId:string='';

  hiveResult:HiveResult;

  oldTime:any;

  showTime:any=new Date();

  resultTime:any;

  allotFlag:boolean=false;

  twoSee:any;

  public formErrors = {
    'customerSimpleName':'',
    'orderCount':'',
    'allotCount':'',
  }

  public validationMessages={
    'customerSimpleName':{
      'required':'Customer simple name cannot be empty',
      'minlength':'Customer simple name length must be over 3 bits',
      'maxlength':'Customer simple name length must be under 8 bits'
    },
    'orderCount':{
      'required':'ContactName cannot be empty',
      'min':'orderCount is more than 1',
      'max':'orderCount is not more than 999999999'
    },
    'allotCount':{
      'required':'ContactName cannot be empty',
      'min':'orderCount is more than 1',
      'max':'orderCount is not more than 999999999'
    }
  }

  constructor(public router:Router,public routeInfo:ActivatedRoute,public orderInfoService:OrderInfoService,public datePipe:DatePipe) {

  }

  ngAfterViewInit(){
    //获取路由中携带的参数
    this.id = this.routeInfo.snapshot.queryParams["id"];
    //获取数据
    if(this.id){
      this.allotFlag = true;
      this.orderInfoService.getOrderById(this.id).subscribe(value=>{
        this.orderInfo =  value.data;
        this.autoOrderId =this.orderInfo.orderId;
        this.oldTime=new DatePipe('pt-PT').transform(new Date(this.orderInfo.deliveryDate),'yyyy/MM/dd');
        this.showTime = this.orderInfo.deliveryDate;
        console.log('Oldtime:'+this.oldTime);
        this.formModel.reset({
          id:this.orderInfo.id,
          customerSimpleName:this.orderInfo.customerSimpleName,
          orderId:this.orderInfo.orderId,
          orderCount:this.orderInfo.orderCount,
          allotCount:this.orderInfo.allotCount,
          deliveryDate:this.orderInfo.deliveryDate
        })
      });
    }

  }

  ngOnInit() {


    //响应式表单，需要构建表单
    let fb = new FormBuilder();
    this.formModel = fb.group({
      id:[''],
      customerSimpleName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]],
      orderId:[''],
      allotCount:['',[Validators.required,Validators.min(1),Validators.max(999999999)]],
      orderCount:['',[Validators.required,Validators.min(1),Validators.max(999999999)]],
      deliveryDate:[''],
    });
    this.submitGetOtderId = true;


    if(this.id){
      this.btFlag=true;
      this.allotFlag = true;
      this.submitGetOtderId=false;
    }



    this.formModel.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  public backList():void{
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0]+"/"+"orderlist");
  }

  public onSubmit():void{
    /*if(this.submitGetOtderId){
      return;
    }*/

    if(this.formModel.value.allotCount<this.formModel.value.orderCount){
      this.formErrors.allotCount ='Allot count must be larger than order count !';
      return;
    }

    this.orderInfo = this.formModel.value;
    this.formModel.reset({
      id:this.orderInfo.id,
      customerSimpleName:this.orderInfo.customerSimpleName,
      orderId:this.autoOrderId,
      orderCount:this.orderInfo.orderCount,
      allotCount:this.orderInfo.allotCount,
      deliveryDate:this.showTime
    })
    if(this.formModel.valid){ //校验通过
      this.orderInfoService.handleData(this.formModel.value).subscribe(
        value=>{
          this.hiveResult = value;
          if(this.hiveResult.status==200){
            this.backList();
          }else{
           this.errorMsg =  this.hiveResult.msg;
          }
        }
      );
    }
  }

  public getOrderId():void{
    this.submitGetOtderId = false;
    if(this.formModel.value.customerSimpleName){
     this.orderInfoService.getAutoCode(this.formModel.value.customerSimpleName).subscribe(
       value => {
         this.hiveResult = value;
         if(this.hiveResult.status==200){
           this.autoOrderId = this.hiveResult.data;
           this.checkCustomerName='';
         }else{
           this.checkCustomerName= this.hiveResult.msg;
         }
       }
     )
    }

  }

  datePick(event){
    console.log('output:'+event);
    this.showTime = event;
    this.resultTime = event;
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
}
