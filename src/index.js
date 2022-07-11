import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';


const httpLink = createHttpLink({
  uri: process.env.REACT_APP_ENDPOINT_URL,
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_SECRET_KEY
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  //</React.StrictMode>
)