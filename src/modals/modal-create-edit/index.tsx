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
import Select, {ISelectOptions} from '../../components/form/select';

const DEFAULT_REPO_FIELDS: IRepository = {
  name: '',
  description: '',
  private: false,
};

const PRIVATE_OPTIONS: ISelectOptions[] = [
  {
    value: 'true',
    text: 'private',
  },
  {
    value: 'false',
    text: 'public',
  },
];

export interface IModalAddEdit {
  data?: IRepository;
  isEdit?: boolean;
  onAccept: (data?: IRepository) => Promise<void>;
}

const ModalAddEdit = (props: IModalAddEdit) => {
  const [current, setCurrent] = useState<IRepository>(
    props.data || DEFAULT_REPO_FIELDS,
  );

  const handleChangeField = (
    value: string | boolean,
    field: keyof IRepository,
  ) => {
    setCurrent({...current, [field]: value});
  };

  return (
    <Modal>
      <ModalHeader>{props.isEdit ? `Edit repo` : `Create repo`}</ModalHeader>
      <ModalBody>
        <Form type={EFormType.row}>
          {!props.isEdit ? (
            <Input
              id="name"
              placeholder="Name"
              value={current.name}
              onChange={(value: string) => handleChangeField(value, 'name')}
            />
          ) : null}
          <Input
            id="description"
            placeholder="Description"
            value={current.description}
            onChange={(value: string) =>
              handleChangeField(value, 'description')
            }
          />
          <Select
            id="private"
            value={String(current.private)}
            options={PRIVATE_OPTIONS}
            onChange={(value: string) =>
              handleChangeField(value === 'true', 'private')
            }
          />
        </Form>
      </ModalBody>
      <ModalFooter onAccept={async () => await props.onAccept(current)} />
    </Modal>
  );
};

export default ModalAddEdit;
