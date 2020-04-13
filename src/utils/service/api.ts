import instance from './http';
import BaseUrl from './base';

import { State as LoginParams } from '../../Pages/Login';

export const exampleService = (): Promise<any> => instance.get(`${BaseUrl.example}/api/v1/topics`);
export const characterService = (params: any): Promise<any> =>
  instance.get(`${BaseUrl.character}/api/people/`, { params });
export const loginService = (data: LoginParams): Promise<any> =>
  instance.post(`${BaseUrl.lolAdmin}/api/login`, data);
