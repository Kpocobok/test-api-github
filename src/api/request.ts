import {req} from '.';
import {IForm, IRepository} from '../interfaces';
import {CORE, EMethod} from './constants';

export const getRepos = (form: IForm) =>
  req({host: `${CORE}/users/${form.owner}/repos`, token: form.token});

export const createRepos = (data: IRepository) =>
  req({method: EMethod.POST, host: `${CORE}/user/repos`, data});

export const updateRepos = (data: IRepository, owner: string, repo: string) =>
  req({method: EMethod.PATCH, host: `${CORE}/repos/${owner}/${repo}`, data});

export const removeRepos = (owner: string, repo: string) =>
  req({method: EMethod.DELETE, host: `${CORE}/repos/${owner}/${repo}`});
