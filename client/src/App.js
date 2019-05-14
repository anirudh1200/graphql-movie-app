import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';

// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Done</h1>
        <MovieList />
        <AddMovie />
      </div>
    </ApolloProvider>
  );
}

export default App;
