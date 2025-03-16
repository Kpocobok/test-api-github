import {useEffect, useState} from 'react';
import {cls} from '../../../helpers';

export interface ISelectOptions {
  value: string;
  text: string;
}

export interface ISelect {
  options: ISelectOptions[];
  id?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const Select = (props: ISelect) => {
  const [current, setCurrent] = useState<string>(props.value || '');

  useEffect(() => {
    setCurrent(props.value || '');
  }, [props.value]);

  return (
    <div className={cls('form__element', props.disabled ? 'disabled' : '')}>
      <select
        id={props.id || ''}
        value={current}
        disabled={props.disabled}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setCurrent(e.target.value);
          if (props.onChange) props.onChange(e.target.value);
        }}>
        {props.options.map((item: ISelectOptions, key: number) => {
          return (
            <option key={key} value={item.value}>
              {item.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
