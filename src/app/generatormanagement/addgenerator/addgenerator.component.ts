import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute,PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {Customer} from "../../models/Customer";
import {GeneratorInfoService} from "../../services/generator-info.service";
import {HiveResult} from "../../models/HiveResult";
import {Generator} from "../../models/Generator";

@Component({
  selector: 'app-addgenerator',
  templateUrl: './addgenerator.component.html',
  styleUrls: ['./addgenerator.component.css']
})
export class AddgeneratorComponent implements OnInit {

  formModel:FormGroup;
  //=new Customer(0,'','','','','','','','','')
  generatorCofig:Generator;

  id:number;

  checkName;

  hiveResult:HiveResult;

  constructor(public router:Router,public routeInfo:ActivatedRoute,public generatorService:GeneratorInfoService) { }

  ngOnInit() {
    //获取路由中携带的参数
    this.id = this.routeInfo.snapshot.queryParams["id"];

    //响应式表单，需要构建表单
    let fb = new FormBuilder();
    this.formModel = fb.group({
      id:[''],
      customerSimpleName:['',[Validators.required]],
      generatorPath:['',[Validators.required]],
    });

    //获取数据
    if(this.id){
      this.generatorService.getGeneratorById(this.id).subscribe(value=>{
        this.generatorCofig =  value.data;
        this.formModel.reset({
          id:this.generatorCofig.id,
          customerSimpleName:this.generatorCofig.customerSimpleName,
          generatorPath:this.generatorCofig.generatorPath
        })
      });
    }

  }

  public backList():void{
    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0]+"/"+"generatorlist");
  }

  public onSubmit():void{
    console.log(this.formModel.value);
    if(this.formModel.valid){ //校验通过
      this.generatorService.handleData(this.formModel.value).subscribe(
        value=>{
          this.hiveResult = value;
          if(this.hiveResult.status==200){
            this.backList();
          }else{
            this.checkName = this.hiveResult.msg;
          }
        }
      );
    }
  }

}
