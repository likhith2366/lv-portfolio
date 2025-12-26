import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Validate environment variable
const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error(
    'REACT_APP_API_URL is not defined. Please check your .env file.'
  );
}

const GRAPHQL_URI = `${API_URL}/graphql`;

// Log GraphQL URI in development mode
if (process.env.NODE_ENV === 'development') {
  console.log('\n=== Apollo Client Configuration ===');
  console.log('GraphQL URI:', GRAPHQL_URI);
  console.log('REACT_APP_API_URL:', API_URL);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('====================================\n');
}

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
