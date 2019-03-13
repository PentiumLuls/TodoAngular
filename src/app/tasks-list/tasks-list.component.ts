import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  inputValue = '';

  @Input() tasks: any;
  @Output() addNewTaskToData: EventEmitter<any> = new EventEmitter();
  @Output() toggleTaskChecked = new EventEmitter();
  @Output() deleteTask = new EventEmitter();

  constructor() {
  }

  addNewTask() {
    if (this.inputValue === '') {
      alert('Please type your task before adding it');
    } else {
      // TODO add list to task also
      const task = {name: this.inputValue, checked: false};
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

  ngOnInit() {
  }

}
