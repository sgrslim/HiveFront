import { Component, OnInit } from '@angular/core';
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {UserInfo} from "../../models/UserInfo";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menus:Array<Menu>=[];
  public subMenu4UserManagement:SubMenu[];
  public subMenu4CustomerManagement:SubMenu[];
  public subMenu4CustomerCodeManagement:SubMenu[];
  public subMenu4CodeManagement:SubMenu[];
  public subMenu4OrderManagement:SubMenu[];
  public subMenu4RequestManagement:SubMenu[];
  public subMenu4Cnfiguration:SubMenu[];


  public currentMenuId:number;

  public userInfo:UserInfo;

  constructor(public router: Router) {
  }

  ngOnInit() {
    let currentUser=localStorage.getItem('userInfo');
    console.log(currentUser);
    if(currentUser){
      this.subMenu4UserManagement=[new SubMenu("userlist","userlist")];
      this.subMenu4CustomerManagement=[new SubMenu("customerlist","customerlist")];
      this.subMenu4CustomerCodeManagement=[new SubMenu("customercodelist","customercodelist")];
      /*this.subMenu4CodeManagement=[new SubMenu("codelist","codelist")];*/
      this.subMenu4OrderManagement=[new SubMenu("orderlist","orderlist")];
      this.subMenu4RequestManagement=[new SubMenu("requestlist","requestlist")];
      this.subMenu4Cnfiguration=[new SubMenu("generatorlist","generatorlist")];
      this.userInfo=JSON.parse(currentUser);
      console.log(this.userInfo);
      if(this.userInfo.role=='1'){
        this.menus.push(new Menu(1,'User Management','fa fa-user',this.subMenu4UserManagement));
        this.menus.push(new Menu(2,'Customer Management','fa fa-users',this.subMenu4CustomerManagement));
        this.menus.push(new Menu(3,'Code Management','fa fa-qrcode',this.subMenu4CustomerCodeManagement));
        /*this.menus.push(new Menu(4,'Code Management',this.subMenu4CodeManagement));*/
        this.menus.push(new Menu(4,'Order Management','fa fa-reorder',this.subMenu4OrderManagement));
        this.menus.push(new Menu(5,'Request Management','fa fa-pencil-square-o',this.subMenu4RequestManagement));
        this.menus.push(new Menu(6,'Cnfiguration','fa fa-cogs',this.subMenu4Cnfiguration));
      }else if(this.userInfo.role=='2'){
        this.menus.push(new Menu(1,'Customer Management','fa fa-user',this.subMenu4CustomerManagement));
        this.menus.push(new Menu(2,'Code Management','fa fa-qrcode',this.subMenu4CustomerCodeManagement));
       /* this.menus.push(new Menu(3,'Code Management',this.subMenu4CodeManagement));*/
        this.menus.push(new Menu(3,'Order Management','fa fa-reorder',this.subMenu4OrderManagement));
        this.menus.push(new Menu(4,'Request Management','fa fa-pencil-square-o',this.subMenu4RequestManagement));
        this.menus.push(new Menu(5,'Cnfiguration','fa fa-meanpath',this.subMenu4Cnfiguration));
      }else if(this.userInfo.role=='3'){
        this.menus.push(new Menu(1,'Request Management','fa fa-pencil-square-o',this.subMenu4RequestManagement));
      }else{

      }
    }



  }

  nav(menu: Menu) {
    this.currentMenuId = menu.id;
  }

  navSub(subMenu: SubMenu) {

    let urlTree:UrlTree=this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0]+'/'+subMenu.link);
  }

}
export class  SubMenu {
  constructor(public name: string,
              public link: string) {

  }
}
  export class Menu {
  constructor(public id: number,
              public name: string,
              public menuStyle:string,
  public subMenus:SubMenu[]) {

  }

}
