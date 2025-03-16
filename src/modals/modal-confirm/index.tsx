import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../../components/modal';
import {IRepository} from '../../interfaces';

export interface IModalConfirm {
  data?: IRepository;
  onAccept: (data?: IRepository) => Promise<void> | void;
}

const ModalConfirm = (props: IModalConfirm) => {
  return (
    <Modal>
      <ModalHeader>Confirm</ModalHeader>
      <ModalBody>
        <div className="message">Do you really want remove this repo?</div>
      </ModalBody>
      <ModalFooter onAccept={() => props.onAccept(props.data)} />
    </Modal>
  );
};

export default ModalConfirm;
