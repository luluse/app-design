import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { URI_CONTENTFUL, BEARER_KEY } from '@env';


const client = new ApolloClient({
  uri: `${URI_CONTENTFUL}`,
  credentials: 'same-origin',
  headers: {
    Authorization: `Bearer ${BEARER_KEY}`
  }
});

const initialState = {
  action: '',
  name: 'Stranger',
  avatar: 'https://cl.ly/55da82beb939/download/avatar-default.jpg'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MENU':
      return { ...state, action: 'openMenu' };
    case 'CLOSE_MENU':
      return { ...state, action: 'closeMenu' };
    case 'UPDATE_NAME':
      return { ...state, name: action.name };
    case 'UPDATE_AVATAR':
      return { ...state, avatar: action.avatar};
    case 'OPEN_CARD':
      return { ...state, action: 'openCard' };
    case 'CLOSE_CARD':
      return { ...state, action: 'closeCard' };
    case 'OPEN_LOGIN':
      return { ...state, action: 'openLogin' };
    case 'CLOSE_LOGIN':
      return { ...state, action: 'closeLogin' };
    case 'OPEN_NOTIF':
      return { ...state, action: 'openNotif' };
    case 'CLOSE_NOTIF':
      return { ...state, action: 'closeNotif' };
    default:
      return state;
    
  }
};

const store = createStore(reducer);

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </ApolloProvider>
);

export default App;