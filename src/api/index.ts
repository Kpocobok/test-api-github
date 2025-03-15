import {store} from '../store';
import {EMethod} from './constants';

export interface IReq {
  host: string;
  method?: EMethod;
  data?: BodyInit;
  headers?: HeadersInit;
}

export const req = async (props: IReq) => {
  const state = store.getState();
  const token = state.app.token;

  try {
    const response: Response = await fetch(props.host, {
      method: props.method || EMethod.GET,
      mode: 'cors',
      redirect: 'follow',
      body: props.data,
      headers: {
        ...(props.headers || {}),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    console.log(response);
  } catch (e) {
    console.error(`Error request: ${e}`);
  }
};
