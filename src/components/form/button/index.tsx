import {ReactNode} from 'react';
import {EButtonType} from '../constants';

export interface IButton {
  type: EButtonType;
  children?: ReactNode;
  onClick?: () => void;
}

const Button = (props: IButton) => {
  return (
    <div className="form__element">
      <button className={props.type} onClick={props.onClick}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
