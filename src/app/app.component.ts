import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '~TODO app~';
  currentListId = 0;
  tasksData = {
    lists: [
      {
        id: 0,
        name: 'Tasks tutorial'
      },
      {
        id: 1,
        name: 'Personal'
      }
    ],
    tasks: [
      {
        id: 0,
        name: 'You can add new task: type it and press \'Add\' button',
        list: 0,
        checked: false
      },
      {
        id: 1,
        name: 'You should`nt be able to see this',
        list: -1,
        checked: false
      },
      {
        id: 2,
        name: 'Click on task to complete it',
        list: 0,
        checked: true
      },
      {
        id: 3,
        name: 'Delete task by pressing \'x\' button on it',
        list: 0,
        checked: true
      },
      {
        id: 4,
        name: 'Edit task -> click on \'Edit\' button',
        list: 0,
        checked: true
      },
      {
        id: 5,
        name: 'uughhh... Some boring info',
        list: 1,
        checked: false
      }
    ]
  };

  // TASKS
  addNewTask(task: any) {
    this.tasksData.tasks.push(task);
  }

  deleteTask(index) {
    this.tasksData.tasks.splice(index, 1);
  }

  toggleTaskChecked(index) {
    this.tasksData.tasks[index].checked = !this.tasksData.tasks[index].checked;
  }

  changeTaskName(obj) {
    const name = obj.name;
    const index = obj.index;
    this.tasksData.tasks[index].name = name;
  }

  // LISTS
  addNewList(listName) {
    let newId = -1;
    for (let list of this.tasksData.lists) {
      if (list.id > newId) {
        newId = list.id;
      }
    }
    newId++;

    const newList = {id: newId, name: listName};
    this.tasksData.lists.push(newList);
  }

  deleteList(id) {
    let offset = -1;
    for (let i = 0; i < this.tasksData.lists.length; i++) {
      if (id === this.tasksData.lists[i].id) {
        offset = i;
        break;
      }
    }
    this.tasksData.lists.splice(offset, 1);

    const newTasks = [];
    for (let i = 0; i < this.tasksData.tasks.length; i++) {
      if (this.tasksData.tasks[i].list !== id) {
        const newTask = this.tasksData.tasks[i];
        newTasks.push(newTask);
      }
    }
    this.tasksData.tasks = newTasks;
  }

  changeCurrentList(index) {
    this.currentListId = index;
  }
}
