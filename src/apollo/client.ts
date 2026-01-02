import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { SERVICE_URL } from '../env';

export const client = new ApolloClient({
    link: new HttpLink({ uri: SERVICE_URL }),
    cache: new InMemoryCache(),
});
