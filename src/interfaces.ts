import {WebStorage} from 'redux-persist';
import {store} from './store';
import {EModals} from './modals/constants';

export interface IForm {
  owner: string;
  token: string;
}

export interface IModal {
  type: EModals;
  data?: IRepository;
  isEdit?: boolean;
  onAccept: (data: IRepository) => Promise<void>;
}

export interface IRepository {
  name: string;
  id?: string;
  html_url?: string;
  private?: boolean;
  visibility?: string;
  description?: string;
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
  modal: IModal | null;
  repositories: IRepository[];
}

export interface IResponse {
  data: unknown;
  status: boolean;
  code: number;
  error: Error | string | null;
}

export type IRootState = ReturnType<typeof store.getState>;
