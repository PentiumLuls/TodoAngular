import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-lists-list',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.css']
})
export class ListsListComponent implements OnInit {

  inputValue = '';

  @Input() tasks: any;
  @Input() currentListId: number;
  @Output() addNewList = new EventEmitter();
  @Output() deleteList = new EventEmitter();
  @Output() changeCurrentListTransfer = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  addNewListLocal() {
    if (this.inputValue === '') {
      alert('Please type new list name before adding it');
    } else {
      this.addNewList.emit(this.inputValue);
      this.inputValue = '';
    }
  }

  deleteListTransfer(index) {
    this.deleteList.emit(index);
  }

  changeCurrentList(index) {
    this.changeCurrentListTransfer.emit(index);
  }

  onInputKeydown(event) {
    if (event.key === 'Enter') {
      this.addNewListLocal();
    } else if (event.key === 'Escape') {
      this.inputValue = '';
    }
  }
}
