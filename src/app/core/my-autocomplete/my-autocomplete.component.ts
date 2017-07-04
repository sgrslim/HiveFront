import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import Order = jasmine.Order;
import {OrderInfoService} from "../../services/order-info.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'my-autocomplete',
  templateUrl: './my-autocomplete.component.html',
  styleUrls: ['./my-autocomplete.component.css']
})
export class MyAutocompleteComponent implements OnInit {
  @Input() items: Array<string>;
  @Output() selected = new EventEmitter();

  @ViewChild('itemList') private itemList: ElementRef;
  @ViewChild('textInput') private textInput: ElementRef;

  private hasFocus: boolean = false;

  public autocompleteSearch: FormControl;
  hide: boolean = true;
  highlighted: number = -1;
  list: Array<any>;

  constructor(public orderInfoService:OrderInfoService) { }

  ngOnInit() {
    this.setupForm();
    /*this.updateList('');*/
  }

  private setupForm() {
    this.autocompleteSearch = new FormControl('');

    this.autocompleteSearch.valueChanges
      .debounceTime(300)
      .subscribe(
        (data) => this.updateList(data)
      );
  }

  private updateList(searchValue: string) {
    this.list = this.items.reduce((list, item) => {
     //list为显示值
      let search = JSON.stringify({'search':searchValue});
      this.orderInfoService.getAllBySearch(search).subscribe(
        data=> {
          this.list=data;

      })
      return list;
    }, []);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick($event: MouseEvent) {
    let current: any = $event.target;

    while (!this.checkIsInside(current) && current !== document) {
      current = current.parentNode;
    }

    if (!this.checkIsInside(current)) {
      this.hasFocus = false;
      this.hideList(true);
    }
  }

  private checkIsInside(node: any) {
    return node === this.textInput.nativeElement ||
      node === this.itemList.nativeElement;
  }

  onSelectItem($event: MouseEvent, item: string) {
    $event.stopImmediatePropagation();
    this.selectItem(item);
  }

  navigateByKey($event: KeyboardEvent) {
    this.hide = false;

    if ($event.key === 'ArrowDown' || $event.key === 'Down' || $event.keyCode === 40) {
      this.highlightNextItem();
    } else if ($event.key === 'ArrowUp' || $event.key === 'Up' || $event.keyCode === 38) {
      this.highlightPreviousItem();
    } else if ($event.key === 'Enter' || $event.keyCode === 13) {
      this.selectHighlightedItem();
    } else {
      this.hideList($event.key === 'Escape' || $event.key === 'Esc' || $event.keyCode === 27);
    }
  }

  private highlightNextItem() {
    let index = this.highlighted + 1;

    if (index > this.list.length - 1) {
      index = 0;
    }

    this.onHighlightItem(index);
  }

  private highlightPreviousItem() {
    let index = this.highlighted - 1;

    if (index < 0) {
      index = this.list.length - 1;
    }

    this.onHighlightItem(index);
  }

  onHighlightItem(index: number) {
    this.highlighted = index;
  }

  private selectHighlightedItem() {
    this.selectItem(this.items[this.highlighted]);
  }

  selectItem(item: string) {
    this.autocompleteSearch.setValue(item);
    this.selected.emit(item);
    this.hideList(true);
  }

  onInputFocused($event: Event) {
    if (!this.hasFocus) {
      this.hasFocus = true;
      this.hideList(false);
    }
  }

  hideList(hide: boolean) {
    this.hide = hide;
  }
}
