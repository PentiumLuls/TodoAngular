import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: any;
  @Input() index: number;
  @Input() currentListId: number;
  @Output() deleteListTransfer = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  deleteListClicked() {
    this.deleteListTransfer.emit(this.index);
  }
}
