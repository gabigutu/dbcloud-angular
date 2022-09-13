import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { ITodo } from './../models/itodo';
import { IUser } from './../models/iuser';
import { UrlParamsService } from './../services/url-params.service';

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

  constructor(
    private urlParamsService: UrlParamsService,
    private requestService: RequestService,
    private route: ActivatedRoute
  ) {
    this.todo = {} as ITodo;
    this.user = {} as IUser;
    this.idTodo = 0;
  }

  ngOnInit(): void {
    // this.myPromiseThen();
    // this.myPromiseAwait();

    // read param id from path
    const that = this;
    // call this without delay
    setTimeout(function() {
      that.readIdParamAndRequestTodoAndUser();
    }, 2000);
    console.log('(D) ============');
    // read endpoints from service
    // TODO: environment variable to show console.logs only in DEBUG MODE
  }

  async requestAllDetails(): Promise<any> {
    // const idParam = await this.urlParamsService.readParam<number>('id');
    const idParam = await this.readParam<number>('id');
    console.log('id param', idParam);
    this.idTodo = idParam;
    console.log('(A) id todo ', this.idTodo);
    if (this.idTodo != 0) {
      console.info("(B) (1) request was sent")
      // this.todo = await this.requestTodoById(this.idTodo);
      this.todo = await this.requestTodoByIdAwait(this.idTodo);
      console.log('(C) (3) user id', this.todo.userId);
      this.requestUserById(this.todo.userId);
    } else {
      console.error("id todo is zero, cannot send request");
    }
  }

  async readParam<T>(field: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.route.params.subscribe(async urlParams => {
        resolve(urlParams[field])
      });
    });
  }

  readIdParamAndRequestTodoAndUser(): void {
    this.route.params.subscribe(async urlParams => {
      this.idTodo = urlParams['id'];
      console.log('id todo ', this.idTodo);
      if (this.idTodo != 0) {
        console.info("(1) request was sent")
        // this.todo = await this.requestTodoById(this.idTodo);
        // this.todo = await this.requestTodoByIdAwait(this.idTodo);
        let test = {} as ITodo;
        // TODO: add todo to url
        test = await this.requestService.sendRequest<ITodo>(test, "todos");
        console.log('Received test =======', test);

        console.log('(3) user id', this.todo.userId);
        this.requestUserById(this.todo.userId);
      } else {
        console.error("id todo is zero, cannot send request");
      }
    });
  }

  async requestTodoByIdAwait(idTodo: number): Promise<ITodo> {
    const url: string = this.todosEndpoint + '/' + idTodo;
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url);
      console.log('mesaj care NU poate sa apara inainte ca raspunsul sa fi venit pe fetch');
      console.log('response from requestTodoByIdAwait ', response);
      const jsonResponse: ITodo = await response.json();
      console.log('(2) jsonResponse from requestTodoByIdAwait ', jsonResponse);
      resolve(jsonResponse);
    });
  }

  requestTodoById(idTodo: number): Promise<any> {
    const url: string = this.todosEndpoint + '/' + idTodo;
    return new Promise((resolve, reject) => {
      fetch(url).then(response => {
        console.log('(2) I received ', response); // ?
        response.json().then((jsonResponse: ITodo) => {
          // parsedResponse e un obiect
          console.log('Response as json ', jsonResponse);
          resolve(jsonResponse);
        });
      });
      console.log('mesaj care poate sa apara inainte ca raspunsul sa fi venit pe fetch');
    });

    fetch(url).then(response => {
      console.log('I received ', response); // ?
      response.json().then((parsedResponse: ITodo) => {
        // parsedResponse e un obiect
        console.log('Response as json ', parsedResponse);
        this.todo = parsedResponse;
        return parsedResponse;
      });
    });
    // return {} as ITodo;
  }

  requestUserById(idUser: number): void {
    const url: string = this.usersEndpoint + '/' + idUser;
    fetch(url).then(response => {
      console.log('(E) (4) I received ', response); // ?
      response.json().then(parsedResponse => {
        // parsedResponse e un obiect
        console.log('Response as json ', parsedResponse);
        this.user = parsedResponse;
      })
    })
  }

  async myPromiseAwait(): Promise<void> {
    await this.myPromise(); // sincron; astepti sa se resolve promise-ul, nu mai faci nimic pana atunci
    console.log('hello message outside of promise');
  }


  myPromiseThen(): void {
    const myP: Promise<string> = this.myPromise();
    myP.then(responose => { // asicnron
      console.warn('Promise-ul a fost rezolvat si a primit ', responose)
    }).catch(errorMsg => {
      console.error('Promise-ul a fost respins cu mesajul ', errorMsg);
    })
    console.log('hello message outside of promise');
  }

  myPromise(): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('hello message inside promise')
      const myNum = Math.random() // [0; 1)
      if (myNum < 0.9) {
        setTimeout(function () {
          console.warn('Sending resolve (3000ms passed)');
          resolve("Numarul e mai mic decat 0.5")
        }, 3000);
      } else {
        reject("Numarul nu e mai mic decat 0.5");
      }
    });

  }



}
