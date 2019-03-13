import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: any;
  @Input() index: number;
  @Input() currentListId: number;
  @Output() deleteTask = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  deleteTaskClicked() {
    this.deleteTask.emit(this.index);
  }
}
