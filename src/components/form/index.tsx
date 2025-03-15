import {ReactNode} from 'react';
import {cls} from '../../helpers';
import {EFormAlign, EFormType} from './constants';

export interface IForm {
  type?: EFormType;
  align?: EFormAlign;
  className?: string;
  children?: ReactNode;
}

const Form = (props: IForm) => {
  return (
    <div
      className={cls(
        'form',
        props.type || '',
        props.className || '',
        props.align || '',
      )}>
      {props.children}
    </div>
  );
};

export default Form;
