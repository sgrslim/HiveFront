import {Component, ElementRef, OnInit, Renderer, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "ng2-translate";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private globalClickCallbackFn: Function;
  private loginSuccessCallbackFn: Function;
  
  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  
  ngOnInit() {
    this.globalClickCallbackFn = this.renderer.listen(this.elementRef.nativeElement, 'click', (event: any) => {
      console.log("全局监听点击事件>" + event);
    });
    
    this.translate.addLangs(["zh", "en"]);
    this.translate.setDefaultLang('zh');
    
    const browserLang = this.translate.getBrowserLang();
    console.log("检测到的浏览器语言>" + browserLang);
    this.translate.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
  }
  
  ngOnDestroy() {
    if (this.globalClickCallbackFn) {
      this.globalClickCallbackFn();
    }
  }
}
