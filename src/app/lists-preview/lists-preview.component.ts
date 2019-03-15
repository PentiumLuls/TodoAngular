import { Component, OnInit } from '@angular/core';
import {TasksServiceService} from '../tasks-service.service';

@Component({
  selector: 'app-lists-preview',
  templateUrl: './lists-preview.component.html',
  styleUrls: ['./lists-preview.component.css']
})
export class ListsPreviewComponent implements OnInit {

  constructor(private tasksService: TasksServiceService) { }

  ngOnInit() {
  }

  cardClicked(listIndex) {
    this.tasksService.navigateToList(listIndex);
  }

}
