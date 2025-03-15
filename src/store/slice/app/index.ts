import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IInitStateApp, IRepository} from '../../../interfaces';

const initialState: IInitStateApp = {
  loading: false,
  token: '',
  owner: '',
  modal: null,
  repositories: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    openModal: (state, action: PayloadAction<React.JSX.Element>) => {
      state.modal = action.payload;
    },
    closeModal: state => {
      state.modal = null;
    },
    setOwner: (state, action: PayloadAction<string>) => {
      state.owner = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRepositories: (state, action: PayloadAction<IRepository[]>) => {
      state.repositories = action.payload;
    },
  },
});

export const {
  setLoading,
  openModal,
  closeModal,
  setOwner,
  setToken,
  setRepositories,
} = appSlice.actions;

export default appSlice.reducer;
