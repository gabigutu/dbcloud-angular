import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';
import { ITodo } from './itodo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  // request all todos from jsonplaceholder and save them into an array
  todos: ITodo[];
  // https://jsonplaceholder.typicode.com/todos
  todosEndpoint: string = 'http://localhost:3000/todos';
  emptyTodo: ITodo = {} as ITodo;
  username: string;

  // dependency injection
  constructor(private dateService: DateService) {
    this.todos = [];
    console.log('construct component');
    this.emptyTodo.title = 'Empty Todo';
    this.emptyTodo.id = -1;
    this.username = 'vasile';
  }

  ngOnInit(): void {
    console.log('init component');
    this.requestTodos();
    console.log(this.dateService.generateDate());
    this.testArr();
  }


  requestTodos(): void {
    const url: string = this.todosEndpoint;
    const that = this;
    fetch(url).then(response => {
      console.log('I received ', response); // ?
      console.log('I received ' + response); // ?
      response.json().then(parsedResponse => {
        // parsedResponse e un obiect
        console.log('Response as json ', parsedResponse);
        this.todos = parsedResponse;
      })
    })
  }
  //before:
  // clickedLi(indexId: number): void {
  //   console.log('You clicked a li with index ' + indexId);
  //   prompt('What is the new title?', this.todos[indexId].title);
  // }

  requestedUpdateListAfterDelete(index: number): void {
    console.log('requested list update after delete', index);
    this.todos.splice(index, 1);
  }

  testArr(): void {
    let isTrue = true;
    let isTrue2 = false;
    if (console.log('I received '), isTrue2, isTrue) {
      console.log('e adevarat');
    } else {
      console.log('e fals');
    }

    var arr = [];
    arr[0] = 1;
    arr[1] = 7; // delete
    arr[2] = 9;
    arr.splice(1, 1)
  }

}
