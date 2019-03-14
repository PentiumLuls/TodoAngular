import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';

import {HttpClient, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TasksListComponent} from './tasks-list/tasks-list.component';
import {TaskComponent} from './task/task.component';
import {ListsListComponent} from './lists-list/lists-list.component';
import {ListComponent} from './list/list.component';
import {Task} from './Task';
import {List} from './List';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskComponent,
    ListsListComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
