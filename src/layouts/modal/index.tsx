import {ReactElement, ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {IRootState} from '../../interfaces';

export interface IModalLayout {
  children?: ReactNode;
}

const ModalLayout = (props: IModalLayout) => {
  const modal = useSelector<IRootState, React.JSX.Element>(
    state => state.app.modal,
  );

  return (
    <div className="layout">
      {modal ? (modal as ReactElement) : null}
      {props.children}
    </div>
  );
};

export default ModalLayout;
