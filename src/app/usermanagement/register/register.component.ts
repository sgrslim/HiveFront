import {Component, Input, OnInit} from '@angular/core';
import {UserInfoService} from "../../services/user-info.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserInfo} from "../../models/UserInfo";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {email} from "../../validators/validator";
import {inject} from "@angular/core/testing";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formModel: FormGroup;

  public hiveResult:Observable<any>;

  public rPasswordMessage;

  /*public errorMsg:any;*/
  /*@Input()
  public inputPassword:string;*/


  public formErrors = {
    'userName':'',
    'email': '',
    'password': ''
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
      'maxlength':'UserName length must be under 64 bits'
    },
    'password': {
      'required': 'Password cannot be empty',
      'minlength': 'Password length must be over 6 bits',
      'maxlength':'Password length must be under 16 bits'
    }
  };


  public userInfo: UserInfo = new UserInfo(0,"","","","","","","","","","",false);

  constructor(public fb: FormBuilder,public userInfoService:UserInfoService,public router: Router) { }

  register(event:any){
    if (!this.formModel.valid) {
      return;
    }
    if(this.rPasswordMessage){
      return;
    }
    this.userInfo = this.formModel.value;
   this.userInfoService.register(this.userInfo)
      .subscribe(
        data => {
          this.router.navigateByUrl("");
        },
        error => {
          console.log(error);
        }
      );

/*
    this.hiveResult.subscribe(value=>{
        this.result = value;
        console.log(this.result);
        if(this.result.status!=200){
        }else{
          if(this.userInfo && this.userInfo.rememberMe){
            localStorage.setItem('currentUser',JSON.stringify(this.userInfo));
          }else{
            localStorage.setItem('currentUser',"");
          }
          this.router.navigateByUrl('/dashboard');
        }
      },
      error =>{},
      ()=>{console.log('!!!!!!!!!!!')});*/
  }

  ngOnInit() {

    this.formModel = this.fb.group(
      {
        userName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(32)]],
        email: ['', [Validators.required,email,Validators.maxLength(64)]],
        password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
        rPassword:['']
      }
    );

    this.formModel.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
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

  show(){
    console.log(this.formModel.value.rPassword);
    console.log(this.formModel.value.password);
    if(this.formModel.value.rPassword!=this.formModel.value.password){
        this.rPasswordMessage = 'Retype password is not same';
    }else{
      console.log('2---')
      this.rPasswordMessage = '';
    }
  }

}
