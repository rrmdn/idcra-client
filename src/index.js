// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import cookie from 'js-cookie';
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
  link: ApolloLink.from([
    createHttpLink({
      uri: 'http://idcra.radityakertiyasa.com:3000/query',
      headers: {
        Authorization: cookie.get('token') ? `Bearer ${cookie.get('token') || ''}` : undefined,
      },
    }),
  ]),
  cache: new InMemoryCache({
    dataIdFromObject: object => {
      const id = object.id;
      if (id) return id;
      return defaultDataIdFromObject(object);
    },
  }),
});

const targetElm = document.getElementById('root');
if (targetElm)
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    targetElm
  );
registerServiceWorker();
