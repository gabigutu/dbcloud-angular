import { IUser } from './../models/iuser';
import { RequestService } from './../services/request.service';
import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';
import { ITodo } from '../models/itodo';

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
  users: IUser[];
  username: string;

  // dependency injection
  constructor(
    private dateService: DateService,
    private requestService: RequestService
  ) {
    this.todos = [];
    this.users = [];
    console.log('construct component');
    this.emptyTodo.title = 'Empty Todo';
    this.emptyTodo.id = -1;
    this.username = 'vasile';
  }

  async ngOnInit(): Promise<void> {
    console.log('init component');
    // this.requestTodos();
    await this.requestService.setupApi();
    this.todos = await this.requestService.sendRequest<ITodo[]>(this.todos, "todos"); // remove await
    this.users = await this.requestService.sendRequest<IUser[]>(this.users, "users"); // remove await
    // for(let user: IUser of this.users) {

    // }
    // 186: request todos //localhost:3000/todos + 185 x request user (id x) //localhost:3000/user/x
    // 11: request todos //localhost:3000/todos + 10 x request unique user (id x) //localhost:3000/user/x
    // 2: request todos //localhost:3000/todos + 1 x request all users //localhost:3000/users

    console.log(this.dateService.generateDate());
    // this.testArr();
    this.testUndefined();
  }

  usernameFromUser(idUser: number): string {
    let user: IUser = this.users.find(x => x.id == idUser)!;
    let username: string | undefined = user?.username;
    if (username != undefined && typeof user != 'undefined') {
      return username;
    } else {
      return '';  
    }
  }

  /* DELETE ME (NOT USED ANYMORE) */
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

  testUndefined(): void {
    var x = undefined;
    console.log(x, typeof x);
    var y  =5;
    console.log(y, typeof y);
    console.log(undefined, typeof undefined); // ?
    console.log(typeof undefined == 'undefined'); // true
    console.log(typeof undefined == undefined); // false
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
