import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const API_URL = process.env.REACT_APP_API_URL || '/api';
const GRAPHQL_URI = `${API_URL}/graphql`;

console.log('GraphQL URI:', GRAPHQL_URI);

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  credentials: 'include', // Enable cookies/credentials for CORS
  fetchOptions: {
    mode: 'cors', // Explicitly set CORS mode
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all', // Return both data and errors
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;
