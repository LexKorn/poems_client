import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import UserStore from './store/UserStore';
import LibraryStore from './store/LibraryStore';

import './style/style.sass';

type RootStateContextValue = {
  users: UserStore;
  library: LibraryStore;
};

export const Context = createContext<RootStateContextValue>({} as RootStateContextValue);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    users: new UserStore(),
    library: new LibraryStore()
  }}>
    <App />
  </Context.Provider>
);