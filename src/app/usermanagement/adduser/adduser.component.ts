import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserInfo} from "../../models/UserInfo";
import {UserInfoService} from "../../services/user-info.service";
import {ActivatedRoute, Router} from "@angular/router";
import {email} from "../../validators/validator";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  password(control:FormControl):any{
    console.log(11);
   if(control.value!=null){
     if(control.value.toString().length>0 && control.value.toString().length<6){
       return {password:true};
     }
     if(control.value.toString().length>16){
       return {password:true};
     }
     return null;
   }else{
     return null;
   }
  }
  checkE(control:FormControl):any{
    this.userService.checkEmail(control.value.toString()).subscribe(
      value=>{
        if(value.status!=200){
          return {checkE:true};

        }else{
          return null;
        }
      }
    );
    /*if(control.value.toString().length>0 && control.value.toString().length<6){
      return {checkE:true};
    }
    if(control.value.toString().length>16){
      return {checkE:true};
    }*/
   /* return null;*/
  }

  public formModel:FormGroup;

  public userInfo:UserInfo;

  public id:number;

  public resultError;

  public checkEmail;

  public checkName;

  public title;

  public readFlag:boolean = false;

  public formErrors = {
    'userName':'',
    'email': '',
    'password': '',
    'role':'',
    'status':''
  };
  validationMessages = {
    'userName':{
      'required':'UserName cannot be empty',
      'minlength':'UserName length must be over 3 bits',
      'maxlength':'UserName length must be under 32 bits'
    },
    'email': {
      'required': 'Email cannot be empty',
      'email': 'Please enter a valid email address',
      'maxlength':'Email length must be under 64 bits',
      'checkE':'The email is already exist'
    },
    'password': {
      'password':'Check your password'
    }
  };

  constructor(public router:Router,public routeInfo:ActivatedRoute,public userService:UserInfoService) { }

  ngOnInit() {
    //获取路由中携带的参数
    this.id = this.routeInfo.snapshot.queryParams["id"];
    //响应式表单，需要构建表单
    let fb = new FormBuilder();
    this.formModel = fb.group({
      id:[''],
      userName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(32)]],
      email:['',[Validators.required,email,Validators.maxLength(64)]],
      password:['',[this.password]],
      role:['',[Validators.required]],
      status:['',[Validators.required]]
    });

    //获取数据
    if(this.id){
      this.title='Update User';
      this.readFlag = true;
      this.userService.getUserId(this.id).subscribe(value=>{
        this.userInfo =  value.data;
        this.formModel.reset({
          id:this.userInfo.id,
          userName:this.userInfo.userName,
          email:this.userInfo.email,
          password:this.userInfo.password,
          role:this.userInfo.role,
          status:this.userInfo.status
        })
      });
    }else{
      this.title='Create User';
      this.readFlag = false;
    }

    this.formModel.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  public backList():void{
    this.router.navigateByUrl("/dashboard/userlist");
  }

  public onSubmit():void{
    console.log(this.formModel.value);
    this.userInfo = this.formModel.value;
   if(!this.userInfo.id){
     this.userService.register(this.userInfo)
       .subscribe(
         data => {
          console.log(data);
          if(data.status!=200){
            /*this.resultError = data.msg;*/
            if(data.status == 400){
              this.checkEmail = data.msg;
            }
            if(data.status == 401){
              this.checkName = data.msg;
            }
          }else{
            this.router.navigateByUrl("/dashboard/userlist");
          }

         },
         error => {
           console.log(error);
         }
       );
   }else{
     this.userService.updateInfo(this.userInfo)
       .subscribe(
         data => {
           this.router.navigateByUrl("/dashboard/userlist");
         },
         error => {
           console.log(error);
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
          console.log(key);

          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  checkUserId(){
  /*  this.userService.checkEmail(this.formModel.value.email).subscribe(
      value=>{
        if(value.status!=200){
          this.checkEmail=value.msg;

        }else{

        }
      }
    );*/
  }
}
