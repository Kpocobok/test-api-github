import {useEffect, useState} from 'react';
import {cls} from '../../../helpers';

export interface IInput {
  id?: string;
  disabled?: boolean;
  value?: string;
  type?: string;
  onChange?: (value: string) => void;
}

const Input = (props: IInput) => {
  const [current, setCurrent] = useState<string>(props.value || '');

  useEffect(() => {
    setCurrent(props.value || '');
  }, [props.value]);

  return (
    <div className={cls('form__element', props.disabled ? 'disabled' : '')}>
      <input
        id={props.id || ''}
        type={props.type || 'text'}
        value={current}
        disabled={props.disabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCurrent(e.target.value);
          if (props.onChange) props.onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
