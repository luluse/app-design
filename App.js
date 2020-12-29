import React from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppNavigator from './navigator/AppNavigator';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { URI_CONTENTFUL, BEARER_KEY } from '@env';


const client = new ApolloClient({
  uri: `${URI_CONTENTFUL}`,
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer ${BEARER_KEY}`
  }
});

const initialState = {
  action: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MENU':
      return { action: 'openMenu' };
    case 'CLOSE_MENU':
      return { action: 'closeMenu' };
    case "OPEN_CARD":
      return { action: "openCard" };
    case "CLOSE_CARD":
      return { action: "closeCard" };
    case "OPEN_LOGIN":
      return { action: "openLogin" };
    case "CLOSE_LOGIN":
      return { action: "closeLogin" };
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