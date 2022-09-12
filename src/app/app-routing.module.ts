import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TodosComponent } from './todos/todos.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: TodosComponent
}, {
  path: 'view/:id',
  component: TodoDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
