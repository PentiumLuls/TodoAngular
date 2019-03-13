import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-lists-list',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.css']
})
export class ListsListComponent implements OnInit {

  inputValue = '';

  @Output() addNewList = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  addNewListLocal() {
    this.addNewList.emit(this.inputValue);
  }

}
