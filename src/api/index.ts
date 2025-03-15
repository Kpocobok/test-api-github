import {IResponse} from '../interfaces';
import {store} from '../store';
import {EMethod} from './constants';

export interface IReq {
  host: string;
  method?: EMethod;
  data?: BodyInit;
  headers?: HeadersInit;
  token?: string;
}

export const req = async (props: IReq): Promise<IResponse> => {
  const state = store.getState();
  const token = props.token || state.app.token;

  return fetch(props.host, {
    method: props.method || EMethod.GET,
    body: props.data,
    headers: {
      ...(props.headers || {}),
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  })
    .then((response: Response) => response.json())
    .then(data => {
      return {data, status: true, error: null};
    })
    .catch((error: Error) => {
      return {data: null, status: false, error};
    });
};
