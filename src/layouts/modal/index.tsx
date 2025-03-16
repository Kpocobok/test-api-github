import {ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {IModal, IRepository, IRootState} from '../../interfaces';
import {EModals} from '../../modals/constants';
import ModalConfirm from '../../modals/modal-confirm';
import ModalAddEdit from '../../modals/modal-create-edit';

export interface IModalLayout {
  children?: ReactNode;
}

const ModalLayout = (props: IModalLayout) => {
  const modal = useSelector<IRootState, IModal | null>(
    state => state.app.modal,
  );

  const renderModal = (): ReactNode | null => {
    if (!modal) return null;

    switch (modal.type) {
      case EModals.CONFIRM:
        return (
          <ModalConfirm
            data={modal.data}
            onAccept={(data?: IRepository) =>
              modal.onAccept(data as IRepository)
            }
          />
        );
      case EModals.EDITADD:
        return (
          <ModalAddEdit
            data={modal.data}
            isEdit={modal.isEdit}
            onAccept={(data?: IRepository) =>
              modal.onAccept(data as IRepository)
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="layout">
      {renderModal()}
      {props.children}
    </div>
  );
};

export default ModalLayout;
