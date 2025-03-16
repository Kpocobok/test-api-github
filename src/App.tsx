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
import {createRepos, getRepos, removeRepos, updateRepos} from './api/request';
import {EModals} from './modals/constants';
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
    handleRefreshRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner, token]);

  useEffect(() => {
    if (search) {
      setFilteredList(
        list.filter(
          (item: IRepository) =>
            item.name.includes(search) || item.description?.includes(search),
        ),
      );
    } else setFilteredList(list);
  }, [search, list]);

  const handleChangeFormField = (value: string, field: keyof IForm) =>
    setForm({...form, [field]: value});

  const handleRemoveRepository = (data: IRepository) =>
    dispatch(
      openModal({
        type: EModals.CONFIRM,
        data,
        onAccept: async (data: IRepository) =>
          await handleAcceptRemoveRepository(data),
      }),
    );

  const handleEditRepository = (data: IRepository) =>
    dispatch(
      openModal({
        type: EModals.EDITADD,
        isEdit: true,
        data,
        onAccept: (data: IRepository) => handleUpdateRepository(data),
      }),
    );

  const handleAddRepository = () =>
    dispatch(
      openModal({
        type: EModals.EDITADD,
        onAccept: (data: IRepository) => handleSaveRepository(data),
      }),
    );

  const handleSubmit = async () => {
    if (form.owner && form.token) {
      dispatch(setOwner(form.owner));
      dispatch(setToken(form.token));
      setForm({owner: '', token: ''});
    }
  };

  const handleRefreshRepos = () => {
    if (owner && token) {
      requestRepos(owner, token);
    }
  };

  const handleClearListRepos = () => {
    setSearch('');
    dispatch(setOwner(''));
    dispatch(setToken(''));
    dispatch(setRepositories([]));
  };

  const handleShowRepository = (data: IRepository) =>
    window.open(data.html_url, '_blank');

  const requestRepos = async (login: string, access: string) => {
    dispatch(setLoading(true));
    try {
      const response = await getRepos({owner: login, token: access});
      if (response.status && Array.isArray(response.data)) {
        dispatch(setRepositories(response.data));
      } else {
        console.error(`Error: ${response.data || response.error}`);
      }
    } catch (e) {
      console.error(`Error: ${e}`);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSaveRepository = async (data: IRepository) => {
    dispatch(setLoading(true));
    try {
      const response = await createRepos(data);
      if (response.status) {
        const newRepo = response.data as IRepository;
        dispatch(setRepositories([...list, newRepo]));
      } else {
        console.error(`Error: ${response.data || response.error}`);
      }
    } catch (e) {
      console.error(`Error: ${e}`);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateRepository = async (data: IRepository) => {
    dispatch(setLoading(true));
    try {
      const response = await updateRepos(
        {
          description: data.description,
          private: data.private,
        } as IRepository,
        owner,
        data.name,
      );

      if (response.status) {
        const updatedRepos = response.data as IRepository;
        dispatch(
          setRepositories([
            ...list.map((item: IRepository) => {
              return item.name === updatedRepos.name ? updatedRepos : item;
            }),
          ]),
        );
      } else {
        console.error(`Error: ${response.data || response.error}`);
      }
    } catch (e) {
      console.error(`Error: ${e}`);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAcceptRemoveRepository = async (data: IRepository) => {
    dispatch(setLoading(true));
    try {
      const response = await removeRepos(owner, data.name);
      console.log(111, response);
      if (response.status && response.code === 204) {
        dispatch(
          setRepositories([
            ...list.filter((item: IRepository) => {
              return item.name !== data.name;
            }),
          ]),
        );
      } else {
        console.error(`Error: ${response.data || response.error}`);
      }
    } catch (e) {
      console.error(`Error: ${e}`);
    } finally {
      dispatch(setLoading(false));
    }
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
              placeholder="Owner"
              onChange={(value: string) =>
                handleChangeFormField(value, 'owner')
              }
            />
            <Input
              id="token"
              disabled={loading}
              value={form.token}
              placeholder="Token"
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
            <Input
              id="search"
              value={search}
              onChange={setSearch}
              placeholder="Search"
            />
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
              onClick={handleClearListRepos}>
              clear
            </Button>
            <Button
              type={EButtonType.primary}
              disabled={loading || !owner || !token}
              onClick={handleRefreshRepos}>
              refresh
            </Button>
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
