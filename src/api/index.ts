import {IRepository, IResponse} from '../interfaces';
import {store} from '../store';
import {EMethod} from './constants';

export interface IReq {
  host: string;
  method?: EMethod;
  data?: IRepository;
  headers?: HeadersInit;
  token?: string;
}

enum SCOPES {
  DELETE_REPO = 'delete_repo',
  REPO = 'repo',
}

export const req = async (props: IReq): Promise<IResponse> => {
  const state = store.getState();
  const token = props.token || state.app.token;

  return fetch(props.host, {
    method: props.method || EMethod.GET,
    body: JSON.stringify(props.data) as BodyInit,
    headers: {
      ...(props.headers || {}),
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
  })
    .then(async (response: Response) => {
      const limits = Number(response.headers.get('x-ratelimit-remaining'));
      const scopes = response.headers.get('x-oauth-scopes') || '';

      if (
        !scopes.includes(SCOPES.DELETE_REPO) ||
        !scopes.includes(SCOPES.REPO)
      ) {
        console.error(`Error required scopes of token!`);
        return {
          data: null,
          status: false,
          code: 500,
          error: `Error required scopes of token!`,
        };
      }

      if (limits <= 0) {
        console.error(`Error rate limit github requests!`);
        return {
          data: null,
          status: false,
          code: 500,
          error: `Error rate limit github requests!`,
        };
      }

      // костыль чтобы прервать .json() после удаления
      if (props.method === EMethod.DELETE) {
        return {data: null, status: true, code: response.status, error: null};
      }

      return response
        .json()
        .then(data => {
          if (!data) {
            console.error(`Error parsing response!`);
            return {
              data: null,
              status: false,
              code: response.status,
              error: `Error parsing response!`,
            };
          }

          return {data, status: true, code: response.status, error: null};
        })
        .catch((error: Error) => {
          console.error(`Error: ${error}`);
          return {data: null, code: 500, status: false, error};
        });
    })
    .catch((error: Error) => {
      console.error(`Error: ${error}`);
      return {data: null, code: 500, status: false, error};
    });
};
