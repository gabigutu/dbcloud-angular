import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ITodo } from '../models/itodo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input()
  index: number;

  @Input()
  todo: ITodo;

  @Output() listUpdated = new EventEmitter<number>();

  todosEndpoint: string = 'http://localhost:3000/todos'; // TODO: move in service

  constructor(private router: Router) {
    this.index = 0;
    this.todo = {} as ITodo;
  }

  ngOnInit(): void {
  }

  clickedLi(): void {
    const newTitle: any = prompt('What is the new title?', this.todo.title);
    if (newTitle) {
      fetch(this.todosEndpoint + '/' + this.todo.id, {
        method: 'PUT',
        body: JSON.stringify(this.todo)
      }).then(data => {
        console.log('I received ', data)
        data.json().then((parsed: ITodo) => {
          console.log("parsed ", parsed);
          // this.todo.title = newTitle;
          this.todo = parsed;
        })
      });
    }
  }


  deleteTodo(event: any): void {
    event.stopPropagation();
    const confirmDelete: boolean = confirm("Are you sure you want to delete the following todo: " + this.todo.title + " ?");
    if (!confirmDelete) return;
    fetch(this.todosEndpoint + '/' + this.todo.id, {
      method: 'DELETE'
    }).then(data => {
      console.log('I received ', data);
      // this.todos.splice(this.index, 1);
      this.listUpdated.emit(this.index);
    });
  }

  viewTodo(event: any, todoId: number): void {
    event.stopPropagation();
    console.log('test', todoId);
    // la componenta TodoDetails 
    // window.location.href = 'http://localhost:4200/view/' + todoId;
    this.router.navigate(['view/', todoId]);
    // use navigate
  }

}
