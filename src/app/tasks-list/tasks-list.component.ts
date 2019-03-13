import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  inputValue = '';

  @Input() tasks: any;
  @Input() currentListId: any;
  @Output() addNewTaskToData: EventEmitter<any> = new EventEmitter();
  @Output() toggleTaskChecked = new EventEmitter();
  @Output() deleteTask = new EventEmitter();
  @Output() changeTaskName = new EventEmitter();

  constructor() {
  }

  addNewTask() {
    if (this.inputValue === '') {
      alert('Please type your task before adding it');
    } else {
      const task = {name: this.inputValue, checked: false, list: this.currentListId};
      this.inputValue = '';
      this.addNewTaskToData.emit(task);
    }
  }

  taskClicked(index) {
      this.toggleTaskChecked.emit(index);
  }

  deleteTaskTransfer(index) {
    this.deleteTask.emit(index);
  }

  isAnyTasksInCurrentList() {
    for (const task of this.tasks.tasks) {
      if (task.list === this.currentListId) {
        return true;
      }
    }
    return false;
  }

  changeTaskNameTransfer(obj) {
    this.changeTaskName.emit(obj);
  }

  onInputKeydown(event) {
    if (event.key === 'Enter') {
      this.addNewTask();
    }
  }

  ngOnInit() {
  }

}
