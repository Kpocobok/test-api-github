import {ReactNode} from 'react';
import {useDispatch} from 'react-redux';
import Form from '../form';
import Button from '../form/button';
import {EButtonType, EFormAlign, EFormType} from '../form/constants';
import {closeModal} from '../../store/slice/app';

export interface IModal {
  children?: ReactNode;
}

export interface IModalFooter {
  onAccept: () => void;
}

export const Modal = (props: IModal) => {
  return (
    <div className="modal">
      <div className="modal__container">{props.children}</div>
    </div>
  );
};

export const ModalHeader = (props: IModal) => {
  return <div className="modal__container-header">{props.children}</div>;
};

export const ModalBody = (props: IModal) => {
  return <div className="modal__container-footer">{props.children}</div>;
};

export const ModalFooter = (props: IModalFooter) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => dispatch(closeModal());

  const handleAcceptModal = () => {
    props.onAccept();
    handleCloseModal();
  };

  return (
    <div className="modal__container-footer">
      <Form type={EFormType.row} align={EFormAlign.right}>
        <Button type={EButtonType.alert} onClick={handleCloseModal}>
          close
        </Button>
        <Button type={EButtonType.primary} onClick={handleAcceptModal}>
          accept
        </Button>
      </Form>
    </div>
  );
};
