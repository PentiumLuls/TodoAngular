import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '~TODO app~';
  tasksData = {
    lists: [
      {
        id: 0,
        name: 'Tasks tutorial'
      },
      {
        id: 1,
        name: 'Personal'
      },
      {
        name: 'newList',
        id: 2
      }
    ],
    tasks: [
      {
        id: 0,
        name: 'You can add new task: type it and press \'Add\' button',
        list: 'Tasks tutorial',
        checked: false
      },
      {
        id: 1,
        name: 'You should`nt be able to see this',
        list: 'testList',
        checked: false
      },
      {
        id: 2,
        name: 'Click on task to complete it',
        list: 'Tasks tutorial',
        checked: true
      },
      {
        id: 3,
        name: 'Delete task by pressing \'x\' button on it',
        list: 'Tasks tutorial',
        checked: true
      },
      {
        id: 4,
        name: 'Edit task -> click on \'Edit\' button',
        list: 'Tasks tutorial',
        checked: true
      },
      {
        id: 5,
        name: 'uughhh... Some boring info',
        list: 'Personal',
        checked: false
      }
    ]
  };

  addNewTask(task: any) {
    this.tasksData.tasks.push(task);
  }

  deleteTask(index) {
    this.tasksData.tasks.splice(index, 1);
  }

  toggleTaskChecked(index) {
    this.tasksData.tasks[index].checked = !this.tasksData.tasks[index].checked;
  }
}
