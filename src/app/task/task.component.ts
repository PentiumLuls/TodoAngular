import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  isEditing = false;
  inputValue = '';

  @Input() task: any;
  @Input() index: number;
  @Input() currentListId: number;
  @Output() deleteTask = new EventEmitter();
  @Output() changeTaskName = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  deleteTaskClicked() {
    this.deleteTask.emit(this.index);
  }

  editTaskClicked() {
    this.inputValue = this.task.name;
    this.isEditing = true;
  }

  cancelEditChanges() {
    this.isEditing = false;
  }

  saveEditChanges() {
    this.isEditing = false;
    this.changeTaskName.emit({name: this.inputValue, index: this.index});
  }

  onInputKeydown(event) {
    if (event.key === 'Enter') {
      this.saveEditChanges();
    } else if (event.key === 'Escape') {
      this.cancelEditChanges();
    }
  }
}
