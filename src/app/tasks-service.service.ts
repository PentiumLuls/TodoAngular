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
  tasks: Task[];
  lists: List[];

  ROOT_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.getTasksFromDB().subscribe(data => this.tasks = data);
    this.getListsFromDB().subscribe(data => this.lists = data);
  }

  //SERVER HANDLERS
  getTasksFromDB(): Observable<Task[]> {
    return this.http.get(this.ROOT_URL + '/tasks')
      .pipe(map(data => {
        let tasksList = data;
        return tasksList.map(function(task: any) {
          return new Task(task.id, task.name, task.list, task.checked);
        });
      }));
    //this.http.get('http://localhost:3000/tasks')
    //.subscribe((data: Task) => this.tasks = data)
  }

  getListsFromDB(): Observable<List[]> {
    return this.http.get(this.ROOT_URL + '/lists').pipe(map(data => {
      let lists = data;
      return lists.map(function(list: any) {
        return new List(list.id, list.name);
      });
    }));
  }

  deleteDataFromDB(targetList: string, id) {
    return this.http.delete(this.ROOT_URL + '/' + targetList + '/' + id);
  }

  postDataToDB(newData: any, target: string) {
    return this.http.post(this.ROOT_URL + '/' + target, newData);
  }

  makePatchToDB(target, id, data) {
    return this.http.patch(this.ROOT_URL + '/' + target + '/' + id, data);
  }

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

    this.postDataToDB(task, 'tasks').subscribe((data: List) => {
      console.log(data);
    });
    this.getTasksFromDB().subscribe(data => this.tasks = data);
  }

  deleteTask(index: number) {
    let offset = this.tasks[index].id;
    this.deleteDataFromDB('tasks', offset).subscribe((data: Task) => {
      console.log(data);
    });
    this.getTasksFromDB().subscribe(data => this.tasks = data);
  }

  toggleTaskChecked(index) {
    const newTask = this.tasks[index];
    newTask.checked = !newTask.checked;
    this.makePatchToDB('tasks', this.tasks[index].id, newTask).subscribe((data: Task) => console.log(data));
    //this.tasks = this.getTasksFromDB().subscribe(data => this.tasks = data);
  }

  changeTaskName(name, index) {
    const newTask = this.tasks[index];
    newTask.name = name;
    const offset = newTask.id;
    this.makePatchToDB('tasks', offset, newTask).subscribe((data: Task) => console.log(data));
    this.getTasksFromDB().subscribe(data => this.tasks = data);
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

    this.postDataToDB(newList, 'lists').subscribe((data: List) => {
      console.log(data);
    });
    this.changeCurrentList(newId);
    this.getTasksFromDB().subscribe(data => this.tasks = data);
    this.getListsFromDB().subscribe(data => this.lists = data);
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
    this.deleteDataFromDB('lists', offset).subscribe((data: List) => {console.log(data)});

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].list === id) {
        this.deleteDataFromDB('tasks', this.tasks[i].id).subscribe((data: Task) => {console.log(data)});
      }
    }
    this.getTasksFromDB().subscribe(data => this.tasks = data);
    this.getListsFromDB().subscribe(data => this.lists = data);
  }

  changeCurrentList(index) {
    this.currentListId = index;
  }
}
