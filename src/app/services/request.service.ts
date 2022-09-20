import { IApiConfig, IApiEndpoint } from './../models/iapi-config';
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { IAxiosResponse } from '../models/iaxios-response';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  apiConfigFile: string = 'assets/config/api-config.json';
  apiUrl: string;
  config: IApiConfig;


  constructor() {
    this.apiUrl = '';
    this.config = {} as IApiConfig;
    // this.setupApi();
  }
  
  async setupApi(): Promise<void> {
    await this.readConfigFile();
    this.buildApiUrl();
    console.log('API URL = ', this.apiUrl);
  }

  async readConfigFile(): Promise<void> {
    this.config = await this.fetchToJson<IApiConfig>(this.apiConfigFile);
  }

  async fetchToJson<T>(path: string): Promise<T> {
    const response: Response = await fetch(path);
    return response.json();
  }

  async axionReq<T>(path: string): Promise<T> {
    return axios.get(path);
  }

  async axiosData<T>(path: string): Promise<T> {
    // const response: IAxiosResponse<T> = await this.axionReq<T>(path) as IAxiosResponse<T>;
    // const response: AxiosResponse<T> = await this.axionReq<T>(path) as AxiosResponse<T>;
    const response: any = await this.axionReq<T>(path);
    console.log(response);
    return response.data;
  }

  async sendRequest<T>(something: T, endpointName: string, urlFragments: string[] = []): Promise<T> {
    // todos/731
    // users
    // ['251', '331', 'dvadadada']
    // photo/251/331/dvadadada
    let sb = '';
    if (urlFragments.length > 0) {  
      for (let fragment of urlFragments) {
        sb += '/' + fragment ;
      }
    }
    // 251/331/dvadadada
    return new Promise(async (resolve, reject) => {
      const url = this.buildEndpointUrl(endpointName, sb);
      // const response: T = await this.fetchToJson<T>(url);
      const response: T = await this.axiosData<T>(url);
      resolve(response);
    });
  }

  buildApiUrl(): void {
    this.apiUrl = '';
    this.apiUrl += this.config.urlParts.protocol + '://' +
      this.config.urlParts.server + ':' + 
      this.config.urlParts.port + '/';
  }

  buildEndpointUrl(name: string, urlAppend: string = ''): string {
    // caut in array-ul this.config.endpoints obiectul care are valoarea din parametrul name pe cheia "name"
    const endpoint: IApiEndpoint | undefined = this.config.endpoints.find(x => x.name == name);
    let fullUrl = this.apiUrl;
    if (endpoint == undefined) {
      return '';
    } else {
      // de adaugat query params la url
      return fullUrl + endpoint.name + urlAppend;
    }
  }




}
