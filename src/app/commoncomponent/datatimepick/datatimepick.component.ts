import {NgModule, Component, OnInit,Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-datatimepick',
  providers:[DatePipe],
  templateUrl: './datatimepick.component.html',
  styleUrls: ['./datatimepick.component.scss']
})
export class DatatimepickComponent implements AfterViewInit {

  public dt: Date = new Date();
  @Input() value: any;
  @Input() show:any;
  @Input() id: string;
  @Output() dateModelChange: EventEmitter<Date> = new EventEmitter();
  public showDatepicker: boolean = false;

  constructor(public datePipe: DatePipe) { }

  public transformDate(date:Date):string {
    var d = new DatePipe('pt-PT').transform(date, 'yyyy/MM/dd');
    return d;
  }

  today(): void {
    this.dt = new Date();
    this.apply();
    this.close();
  }
  clear(): void {
    this.dt = this.value = void 0;
    this.close();
  }

  public apply(): void {
    this.value = this.transformDate(this.dt);
    this.dateModelChange.emit(this.dt);
  }

  open() {
    this.showDatepicker = true;
  }
  close() {
    this.showDatepicker = false;
  }

  onSelectionDone(event) {
    this.show = event;
    this.dt = event;
    this.apply();
    this.close();
  }
  onClickedOutside(event) {
    if (this.showDatepicker) this.close();
  }

  ngAfterViewInit() {
    this.dt = new Date(this.value);
    this.apply();

  }

  ngOnInit() {
    this.apply();
  }
}
