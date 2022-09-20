import { IAddress } from './iaddress';

export interface IUser {
    id: number;
    name: string;
    username: string | undefined;
    email: string;
    address: IAddress;
};
