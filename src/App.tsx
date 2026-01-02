import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client/react';
import { Main } from './components/Main/Main';
import { client } from './apollo/client';
import { store } from './store/store';
import './styles.scss';

export const App = () => {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Main />
            </ApolloProvider>
        </Provider>
    );
};
