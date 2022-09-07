import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  // request all todos from jsonplaceholder and save them into an array
  todos: any[];
  // https://jsonplaceholder.typicode.com/todos

  constructor() {
    this.todos = [];
    console.log('construct component');
  }

  ngOnInit(): void {
    console.log('init component');
    this.requestTodos();
  }

  requestTodos(): void {
    const url: string = 'https://jsonplaceholder.typicode.com/todos';
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

  clickedLi(indexId: number): void {
    console.log('You clicked a li with index ' + indexId);
    prompt('What is the new title?', this.todos[indexId].title);
  }

}
