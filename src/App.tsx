import {openModal} from './store/slice/app';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IRepository, IRootState} from './interfaces';
import {EButtonType, EFormAlign, EFormType} from './components/form/constants';
import Button from './components/form/button';
import Input from './components/form/input';
import List from './components/list';
import Form from './components/form';
import ModalAddEdit from './modals/modal-create-edit';
import ModalConfirm from './modals/modal-confirm';
import './App.scss';

interface IForm {
  owner: string;
  token: string;
}

function App() {
  const dispatch = useDispatch();
  const list = useSelector<IRootState, IRepository[]>(
    state => state.app.repository,
  );
  const [search, setSearch] = useState<string>('');
  const [form, setForm] = useState<IForm>({owner: '', token: ''});
  const [filteredList, setFilteredList] = useState<IRepository[]>(list);

  useEffect(() => {
    if (search) {
      setFilteredList(
        list.filter(
          (item: IRepository) =>
            item.name.includes(search) || item.description.includes(search),
        ),
      );
    } else setFilteredList(list);
  }, [search, list]);

  const handleChangeFormField = (value: string, field: keyof IForm) =>
    setForm({...form, [field]: value});

  const handleRemoveRepository = (data: IRepository) =>
    dispatch(
      openModal(() => (
        <ModalConfirm
          data={data}
          onAccept={async (data: IRepository) =>
            await handleAcceptRemoveRepository(data)
          }
        />
      )),
    );

  const handleEditRepository = (data: IRepository) =>
    dispatch(
      openModal(() => (
        <ModalAddEdit
          isEdit
          data={data}
          onAccept={async (data: IRepository) =>
            await handleSaveRepository(data)
          }
        />
      )),
    );

  const handleAddRepository = () =>
    dispatch(
      openModal(() => (
        <ModalAddEdit
          onAccept={(data: IRepository) => handleSaveRepository(data)}
        />
      )),
    );

  const handleSubmit = () => {
    console.log(form);
  };

  const handleShowRepository = (data: IRepository) => {
    console.log(data);
  };

  const handleSaveRepository = async (data: IRepository) => {
    console.log(data);
  };

  const handleAcceptRemoveRepository = async (data: IRepository) => {
    console.log(data);
  };

  return (
    <div className="main">
      <div className="grid">
        <div className="grid__column">
          <Form type={EFormType.row}>
            <Input
              id="owner"
              value={form.owner}
              onChange={(value: string) =>
                handleChangeFormField(value, 'owner')
              }
            />
            <Input
              id="token"
              value={form.token}
              onChange={(value: string) =>
                handleChangeFormField(value, 'token')
              }
            />
            <Button type={EButtonType.primary} onClick={handleSubmit}>
              sign in
            </Button>
          </Form>
        </div>
        <div className="grid__column">
          <Form align={EFormAlign.right} type={EFormType.collumn}>
            <Input id="search" value={search} onChange={setSearch} />
          </Form>
          {list.length ? (
            <List
              list={filteredList}
              onShow={handleShowRepository}
              onEdit={handleEditRepository}
              onRemove={handleRemoveRepository}
            />
          ) : (
            <div className="grid__column">
              <div className="message">No repositories found</div>
            </div>
          )}
          <Form type={EFormType.collumn} align={EFormAlign.right}>
            <Button type={EButtonType.primary} onClick={handleAddRepository}>
              add
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
