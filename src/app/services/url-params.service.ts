import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlParamsService {

  constructor(private route: ActivatedRoute) { }

  readParam<T>(paramName: string): Promise<T> {
    console.log('!!! requested url param with name ', paramName);
    return new Promise((resolve, reject) => {
      this.route.params.subscribe(async urlParams => {
        console.log('!!! url params are: ', urlParams);
        resolve(urlParams[paramName]);
      });
    });
  }

  

}
