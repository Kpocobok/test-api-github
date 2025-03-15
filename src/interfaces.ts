import {WebStorage} from 'redux-persist';
import {store} from './store';

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
  modal: () => React.JSX.Element | null;
  repositories: IRepository[];
}

export type IRootState = ReturnType<typeof store.getState>;
