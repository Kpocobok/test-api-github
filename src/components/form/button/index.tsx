import {ReactNode} from 'react';
import {EButtonType} from '../constants';
import {cls} from '../../../helpers';

export interface IButton {
  type: EButtonType;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

const Button = (props: IButton) => {
  return (
    <div className={cls('form__element', props.disabled ? 'disabled' : '')}>
      <button
        className={props.type}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
