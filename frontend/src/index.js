import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import App from './App'; // Assuming your App component is in a separate file
import { ChakraProvider } from '@chakra-ui/react';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://curling-app-database.hasura.app/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  // You can include any authentication logic here if needed
  // For example, you can add an authorization token to the headers
  return {
    headers: {
      ...headers,
      // 'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  );
} catch (error) {
  console.error('Error during rendering:', error);
}
