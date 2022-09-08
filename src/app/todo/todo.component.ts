import { ITodo } from './../todos/itodo';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() {
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

}
