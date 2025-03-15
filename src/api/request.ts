import {req} from '.';
import {IForm} from '../interfaces';
import {API_URL} from './constants';

export const getRepos = (form: IForm) =>
  req({host: `${API_URL}/${form.owner}/repos`, token: form.token});
