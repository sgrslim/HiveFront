import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {cellphone, email} from "../../validators/validator";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute,PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {Customer} from "../../models/Customer";
import {CustomerInfoService} from "../../services/customer-info.service";
import {HiveResult} from "../../models/HiveResult";

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {

  formModel:FormGroup;
  //=new Customer(0,'','','','','','','','','')
  customer:Customer;

  title:string;

  customerId:number;

  customerNameError:string;

  customerSimpleNameError:string;

  hiveResult:HiveResult;

  public formErrors = {
    'customerName':'',
    'customerSimpleName':'',
    'tel':'',
    'addr':'',
    'contactName':''
  }

  public validationMessages={
    'customerName':{
      'required':'Customer name cannot be empty',
      'minlength':'Customer name length must be over 3 bits',
      'maxlength':'Customer name length must be under 128 bits'
    },
    'customerSimpleName':{
      'required':'Customer simple name cannot be empty',
      'minlength':'Customer simple name length must be over 3 bits',
      'maxlength':'Customer simple name length must be under 8 bits'
    },
    'tel':{
      'required':'Tel cannot be empty',
      'cellphone':'Tel phone number is not in the correct format',
      'maxlength':'Tel length must be under 16 bits'
    },
    'addr':{
      'required':'Address cannot be empty',
      'maxlength':'Address length must be under 256 bits'
    },
    'contactName':{
      'required':'ContactName cannot be empty',
      'maxlength':'ContactName length must be under 32 bits'
    }
  }

  constructor(public router:Router,public routeInfo:ActivatedRoute,public customerService:CustomerInfoService) { }

  ngOnInit() {
      //获取路由中携带的参数
      this.customerId = this.routeInfo.snapshot.queryParams["id"];

    //响应式表单，需要构建表单
    let fb = new FormBuilder();
    this.formModel = fb.group({
      customerId:[''],
      customerName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(128)]],
      customerSimpleName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]],
      tel:['',[Validators.required,cellphone,Validators.maxLength(16)]],
      addr:['',[Validators.required,Validators.maxLength(256)]],
      contactName:['',[Validators.required,Validators.maxLength(32)]]
    });

      //获取数据
      if(this.customerId){
        this.title = 'Update Customer';
         this.customerService.getCustomerById(this.customerId).subscribe(value=>{
          this.customer =  value.data;
          this.formModel.reset({
            customerId:this.customer.customerId,
            customerName:this.customer.customerName,
            customerSimpleName:this.customer.customerSimpleName,
            tel:this.customer.tel,
            addr:this.customer.addr,
            contactName:this.customer.contactName
          })
        });
      }else{
        this.title = 'Create Customer';
      }
    this.formModel.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  public backList():void{
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0]+"/"+"customerlist");
  }

  public onSubmit():void{
    console.log(this.formModel.value);
    if(this.formModel.valid){ //校验通过
        this.customerService.handleData(this.formModel.value).subscribe(
          value=>{
           this.hiveResult = value;
           if(this.hiveResult.status==200){
              this.backList();
           }
           if(this.hiveResult.status==401){
             this.customerNameError = this.hiveResult.msg;
             this.customerSimpleNameError='';
           }
            if(this.hiveResult.status==402){
              this.customerSimpleNameError = this.hiveResult.msg;
              this.customerNameError='';
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

}
