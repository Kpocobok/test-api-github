import {useState} from 'react';
import Form from '../../components/form';
import {EFormType} from '../../components/form/constants';
import Input from '../../components/form/input';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../../components/modal';
import {IRepository} from '../../interfaces';

const DEFAULT_REPO_FIELDS: IRepository = {
  uuid: '',
  name: '',
  description: '',
  visibility: '',
};

export interface IModalAddEdit {
  data?: IRepository;
  isEdit?: boolean;
  onAccept: (data: IRepository) => Promise<void>;
}

const ModalAddEdit = (props: IModalAddEdit) => {
  const [current, setCurrent] = useState<IRepository>(
    props.data || DEFAULT_REPO_FIELDS,
  );

  const handleChangeField = (value: string, field: keyof IRepository) => {
    setCurrent({...current, [field]: value});
  };

  return (
    <Modal>
      <ModalHeader>{props.isEdit ? `Edit repo` : `Create repo`}</ModalHeader>
      <ModalBody>
        <Form type={EFormType.collumn}>
          <Input
            id="name"
            value={current.name}
            onChange={(value: string) => handleChangeField(value, 'name')}
          />
          <Input
            id="description"
            value={current.description}
            onChange={(value: string) =>
              handleChangeField(value, 'description')
            }
          />
        </Form>
      </ModalBody>
      <ModalFooter onAccept={() => props.onAccept(current)} />
    </Modal>
  );
};

export default ModalAddEdit;
