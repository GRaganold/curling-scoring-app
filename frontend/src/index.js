
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import App from './App'; // Assuming your App component is in a separate file




const HASURA_ADMIN_SECRET = process.env.REACT_APP_HASURA_ADMIN_SECRET;

const httpLink = createHttpLink({
  uri: 'https://curling-data-base-gr.hasura.app/v1/graphql',
  context: {
    headers: {
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
    },
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

try {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );
} catch (error) {
  console.error('Error during rendering:', error);
}

  

