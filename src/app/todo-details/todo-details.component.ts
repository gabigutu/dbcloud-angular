import { ITodo } from './../models/itodo';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITodo } from '../models/itodo';
import { IUser } from './../models/iuser';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  todosEndpoint: string = 'http://localhost:3000/todos'; // append todo id
  usersEndpoint: string = 'http://localhost:3000/users'; // append user id
  todo: ITodo;
  user: IUser;
  idTodo: number;

  constructor(private route: ActivatedRoute) {
    this.todo = {} as ITodo;
    this.user = {} as IUser;
    this.idTodo = 0;
  }

  ngOnInit(): void {
    // read param id from path
    this.route.params.subscribe(async urlParams => {
      this.idTodo = urlParams['id'];
      console.log('id todo ', this.idTodo);
      if (this.idTodo != 0) {
        console.info("request was sent")
        await this.requestTodoById(this.idTodo);
        console.log('user id', this.todo.userId);
        this.requestUserById(this.todo.userId);
      } else {
        console.error("id todo is zero, cannot send request");
      }
    });
  }

  requestTodoById(idTodo: number): Promise<ITodo> {
    const url: string = this.todosEndpoint + '/' + idTodo;
    fetch(url).then(response => {
      console.log('I received ', response); // ?
      response.json().then((parsedResponse: ITodo) => {
        // parsedResponse e un obiect
        console.log('Response as json ', parsedResponse);
        this.todo = parsedResponse;
        return parsedResponse;
      });
    });
    return {} as ITodo;
  }

  requestUserById(idUser: number): void {
    const url: string = this.usersEndpoint + '/' + idUser;
    fetch(url).then(response => {
      console.log('I received ', response); // ?
      response.json().then(parsedResponse => {
        // parsedResponse e un obiect
        console.log('Response as json ', parsedResponse);
        this.user = parsedResponse;
      })
    })
  }

  

}
