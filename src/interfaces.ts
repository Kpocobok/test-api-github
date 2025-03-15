import {WebStorage} from 'redux-persist';
import {store} from './store';

export interface IForm {
  owner: string;
  token: string;
}

export interface IRepository {
  uuid: string;
  name: string;
  description: string;
  visibility: string;
}

export interface IPersit {
  key: string;
  storage: WebStorage;
  debug: boolean;
}

export interface IInitStateApp {
  loading: boolean;
  token: string;
  owner: string;
  modal: React.JSX.Element | null;
  repositories: IRepository[];
}

export interface IResponse {
  data: unknown;
  status: boolean;
  error: Error | null;
}

export type IRootState = ReturnType<typeof store.getState>;
