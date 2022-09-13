export interface IApiConfig {
    urlParts: IApiUrl;
    endpoints: IApiEndpoint[];
}

interface IApiUrl {
    protocol: string;
    server: string;
    port: number;
}
export interface IApiEndpoint {
    name: string;
    queryParams: any;
}
