import {useEffect, useState} from 'react';

export interface IInput {
  id?: string;
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
    <div className="form__element">
      <input
        id={props.id || ''}
        type={props.type || 'text'}
        value={current}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCurrent(e.target.value);
          if (props.onChange) props.onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
