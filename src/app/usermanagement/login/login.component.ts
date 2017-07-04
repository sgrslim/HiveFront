import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {email} from "../../validators/validator";
import {UserInfo} from "../../models/UserInfo";
import {UserInfoService} from "../../services/user-info.service";
import {HiveResult} from "../../models/HiveResult";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{



  public formErrors = {

    'email': '',
    'password': ''
  };
  validationMessages = {

    'email': {
      'required': 'Email cannot be empty',
      'email': 'Please enter a valid email address'
    },
    'password': {
      'required': 'Password cannot be empty',
      'minlength': 'Password length must be over 6 bits'
    }
  };

   public  formModel: FormGroup;

   public userInfo: UserInfo = new UserInfo(0,"","","","","","","","","","",false);

  public hiveResult:Observable<any>;

  public errorMessage:string;

  public result:HiveResult = new HiveResult(400,"","");

  public passwordClean:string;


  constructor(public fb: FormBuilder,public routeInfo: ActivatedRoute,
              public router: Router, public  userService:UserInfoService) {
  }


   login(event:any){
     if (this.formModel.valid) {
       this.userInfo = this.formModel.value;
     }
     //this.userService.login(this.formModel.value.email,this.formModel.value.password);
     this.hiveResult = this.userService.login(this.formModel.value.email,this.formModel.value.password);
     this.hiveResult.subscribe(value=>{
       console.log(3333);
        this.result = value;
         if(this.result.status!=200){
           this.errorMessage = this.result.msg;
         }else{
            //获取用户权限等级
            this.userService.getByToken(this.result.data).subscribe(
              value=>{
                localStorage.setItem('userInfo',JSON.stringify(value.data));
              }
            )
           if(this.userInfo && this.userInfo.rememberMe){
             localStorage.setItem('currentUser',JSON.stringify(this.userInfo));
           }else{
             localStorage.setItem('currentUser','');
           }
           this.router.navigateByUrl('/dashboard/userlist');
         }
       },
       error =>{},
       ()=>{console.log('!!!!!!!!!!!')});


     //   this.userRegisterService.register(this.userInfo)
     //     .subscribe(
     //       data => {
     //         this.router.navigateByUrl("home");
     //       },
     //       error => {
     //         this.formErrors.formError = error.message;
     //         console.error(error);
     //       }
     //     );
     // } else {
     //   this.formErrors.formError = "存在不合法的输入项，请检查。";
     // }

    /*if(this.userInfo){
      localStorage.setItem('currentUser',JSON.stringify(this.userInfo));
    }
     console.error(JSON.stringify(this.userInfo));*/
    //this.router.navigateByUrl('/dashboard');
  }

  ngOnInit() {

     let currentUser=localStorage.getItem('currentUser');
      if(currentUser){
        this.userInfo=JSON.parse(currentUser);

      }

    console.log(this.userInfo);
    this.formModel = this.fb.group(
      {
        email: ['', [Validators.required,email]],
        password: ['', [Validators.required,Validators.minLength(6)]],
        rememberMe: ['']
      }
    );
    console.log(this.userInfo.rememberMe);
    if(this.userInfo.rememberMe){
      console.log(1);
      this.formModel.reset({
          email:this.userInfo.email,
          password:this.userInfo.password,
          rememberMe:this.userInfo.rememberMe
        }
      );
    }else{
      console.log(2);
      this.formModel.reset({
          email:this.userInfo.email,
          password:'',
          rememberMe:this.userInfo.rememberMe
        }
      );
    }

    this.formModel.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

  }
  onValueChanged(data?: any) {
     this.errorMessage='';
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
  // nameChangeLog: string[] = [];
  // logNameChange() {
  //   const nameControl = this.formModel.get('name');
  //   nameControl.valueChanges.forEach(
  //     (value: string) => this.nameChangeLog.push(value)
  //   );
  // }


}
