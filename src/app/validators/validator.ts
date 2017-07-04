/**
 * Created by ujste on 2017/6/6 0006.
 */
import {AbstractControl, ValidatorFn, Validators} from "@angular/forms";
import {isPresent} from "../utils/lang";

export const email: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
  if (isPresent(Validators.required(control))) return null;
  let v: string = control.value;
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) ? null : {'email': true};
};

export const cellphone: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
  if (isPresent(Validators.required(control))) return null;
  let v: string = control.value;
  return (/^1[3|4|5|8][0-9]\d{4,8}$/).test(v) ? null : {'cellphone': true};
};


