import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Task} from './Task';
import {List} from './List';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

  currentListId = 0;
  tasks: Task[] = [];
  lists: List[] = [];

  constructor(private http: HttpClient) {
    this.tasks = this.getTasksFromDB().subscribe(data => this.tasks = data);
    this.lists = this.getListsFromDB().subscribe(data => this.lists = data);
  }

  //SERVER HANDLERS
  getTasksFromDB(): Observable<Task[]> {
    return this.http.get('http://localhost:3000/tasks')
      .pipe(map(data => {
        let tasksList = data;
        return tasksList.map(function(task:any) {
          return new Task(task.id, task.name, task.list, task.checked);
        });
      }));
    //this.http.get('http://localhost:3000/tasks')
    //.subscribe((data: Task) => this.tasks = data)
  }

  getListsFromDB() : Observable<List[]> {
    return this.http.get('http://localhost:3000/lists').pipe(map(data=>{
      let lists = data;
      return lists.map(function(list:any) {
        return new List(list.id, list.name);
      });
    }));
  }

  /*getListsFromDB() {
    this.http.get('http://localhost:3000/lists')
      .subscribe((data: List) => this.lists = data);
  }*/


  // TASKS
  addNewTask(name) {
    let newId = -1;
    for (let task of this.tasks) {
      if (task.id > newId) {
        newId = task.id;
      }
    }
    newId++;
    const task = new Task(newId, name, this.currentListId, false);
    this.tasks.push(task);
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  toggleTaskChecked(index) {
    this.tasks[index].checked = !this.tasks[index].checked;
  }

  changeTaskName(name, index) {
    this.tasks[index].name = name;
  }

  // LISTS
  addNewList(listName) {
    let newId = -1;
    for (let list of this.lists) {
      if (list.id > newId) {
        newId = list.id;
      }
    }
    newId++;

    const newList = {id: newId, name: listName};
    this.lists.push(newList);
  }

  deleteList(id) {
    let offset = -1;
    for (let i = 0; i < this.lists.length; i++) {
      if (id === this.lists[i].id) {
        offset = i;
        break;
      }
    }
    this.lists.splice(offset, 1);

    const newTasks = [];
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].list !== id) {
        const newTask = this.tasks[i];
        newTasks.push(newTask);
      }
    }
    this.tasks = newTasks;
  }

  changeCurrentList(index) {
    this.currentListId = index;
  }
}
