import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HiveResult} from "../../models/HiveResult";
import {ActivatedRoute, PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {CustomercodeInfoService} from "../../services/customercode-info.service";
import {CustomerCode} from "../../models/CustomerCode";

@Component({
  selector: 'app-addcustomercode',
  templateUrl: './addcustomercode.component.html',
  styleUrls: ['./addcustomercode.component.scss']
})
export class AddcustomercodeComponent implements OnInit {

  formModel:FormGroup;

  formErrors={
    'customerSimpleName':'',
    'count':''
  }

  validationMessages={
    'customerSimpleName':{
      'required':'Customer simple name cannot be empty'
    },
    'count':{
      'required':'count cannot be empty',
      'min':'count must be over 1',
      'max':'count is too large'
    }
  }

  //=new Customer(0,'','','','','','','','','')
  customerCode:CustomerCode;

  id:number;

  errorResult;

  title:string = 'Create Code';

  hiveResult:HiveResult;

  constructor(public router:Router,public routeInfo:ActivatedRoute,public customerCodeService:CustomercodeInfoService) { }

  ngOnInit() {
    //获取路由中携带的参数
    this.id = this.routeInfo.snapshot.queryParams["id"];

    //响应式表单，需要构建表单
    let fb = new FormBuilder();
    this.formModel = fb.group({
      customerSimpleName:['',[Validators.required]],
      count:['',[Validators.required,Validators.min(1),Validators.max(99999999999)]]
    });
    this.formModel.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  public backList():void{
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0]+"/"+"customercodelist");
  }

  public onSubmit():void{
    console.log(this.formModel.value);
    if(this.formModel.valid){ //校验通过
      this.customerCodeService.handleData(this.formModel.value).subscribe(
        value=>{
          this.hiveResult = value;
          if(this.hiveResult.status==200){
            this.backList();
          }else{
            this.errorResult = this.hiveResult.msg;
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
