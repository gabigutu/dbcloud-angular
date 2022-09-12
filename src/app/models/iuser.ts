import { IAddress } from './iaddress';

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
};
