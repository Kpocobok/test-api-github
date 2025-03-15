import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {persistor, store} from './store/index.ts';
import {PersistGate} from 'redux-persist/integration/react';
import ModalLayout from './layouts/modal/index.tsx';
import App from './App.tsx';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ModalLayout>
        <App />
      </ModalLayout>
    </PersistGate>
  </Provider>,
);
