import {
  openModal,
  setLoading,
  setOwner,
  setRepositories,
  setToken,
} from './store/slice/app';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IRepository, IRootState, IForm} from './interfaces';
import {EButtonType, EFormAlign, EFormType} from './components/form/constants';
import Button from './components/form/button';
import Input from './components/form/input';
import List from './components/list';
import Form from './components/form';
import ModalAddEdit from './modals/modal-create-edit';
import ModalConfirm from './modals/modal-confirm';
import {getRepos} from './api/request';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const list = useSelector<IRootState, IRepository[]>(
    state => state.app.repositories,
  );
  const owner = useSelector<IRootState, string>(state => state.app.owner);
  const token = useSelector<IRootState, string>(state => state.app.token);
  const loading = useSelector<IRootState, boolean>(state => state.app.loading);
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
      openModal(
        <ModalConfirm
          data={data}
          onAccept={async (data: IRepository) =>
            await handleAcceptRemoveRepository(data)
          }
        />,
      ),
    );

  const handleEditRepository = (data: IRepository) =>
    dispatch(
      openModal(
        <ModalAddEdit
          isEdit
          data={data}
          onAccept={async (data: IRepository) =>
            await handleSaveRepository(data)
          }
        />,
      ),
    );

  const handleAddRepository = () =>
    dispatch(
      openModal(
        <ModalAddEdit
          onAccept={(data: IRepository) => handleSaveRepository(data)}
        />,
      ),
    );

  const handleSubmit = async () => {
    if (form.owner && form.token) {
      dispatch(setLoading(true));
      try {
        const response = await getRepos(form);
        if (response.status && Array.isArray(response.data)) {
          dispatch(setRepositories(response.data));
          dispatch(setOwner(form.owner));
          dispatch(setToken(form.token));
        } else {
          console.error(`Error: ${response.data || response.error}`);
        }
      } catch (e) {
        console.error(`Error: ${e}`);
      } finally {
        setForm({owner: '', token: ''});
        dispatch(setLoading(false));
      }
    }
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
              disabled={loading}
              value={form.owner}
              onChange={(value: string) =>
                handleChangeFormField(value, 'owner')
              }
            />
            <Input
              id="token"
              disabled={loading}
              value={form.token}
              onChange={(value: string) =>
                handleChangeFormField(value, 'token')
              }
            />
            <Button
              type={EButtonType.primary}
              disabled={loading || !form.owner || !form.token}
              onClick={handleSubmit}>
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
              loading={loading}
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
            <Button
              type={EButtonType.primary}
              disabled={loading || !owner || !token}
              onClick={handleAddRepository}>
              add
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
