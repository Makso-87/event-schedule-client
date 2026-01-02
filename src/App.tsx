import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import './styles.scss';
import { Main } from './components/Main/Main';
import { client } from './apollo/client';

export const App = () => {
    return (
        <ApolloProvider client={client}>
            <Main />
        </ApolloProvider>
    );
};
