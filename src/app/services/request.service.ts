import { IApiConfig, IApiEndpoint } from './../models/iapi-config';
import { Injectable } from '@angular/core';

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
    this.setupApi();
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

  async sendRequest<T>(something: T, endpointName: string): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const url = this.buildEndpointUrl(endpointName);
      const response: T = await this.fetchToJson<T>(url);
      resolve(response);
    });
  }

  buildApiUrl(): void {
    this.apiUrl = '';
    this.apiUrl += this.config.urlParts.protocol + '://' +
      this.config.urlParts.server + ':' + 
      this.config.urlParts.port + '/';
  }

  buildEndpointUrl(name: string): string {
    // caut in array-ul this.config.endpoints obiectul care are valoarea din parametrul name pe cheia "name"
    const endpoint: IApiEndpoint | undefined = this.config.endpoints.find(x => x.name == name);
    let fullUrl = this.apiUrl;
    if (endpoint == undefined) {
      return '';
    } else {
      // de adaugat query params la url
      return fullUrl + endpoint.name;
    }
  }




}
