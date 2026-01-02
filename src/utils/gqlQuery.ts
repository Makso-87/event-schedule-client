import { client } from '../apollo/client';
import { OperationVariables, TypedDocumentNode } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { TGraphQLResponse } from '../types';

export const gqlQuery = async (
    query: DocumentNode | TypedDocumentNode<string, unknown>,
    variables?: OperationVariables,
) => {
    return client
        .query({
            query,
            variables,
            fetchPolicy: 'network-only',
        })
        .then((res): TGraphQLResponse => {
            const { data, errors } = res as unknown as TGraphQLResponse;

            return {
                data,
                errors,
            };
        })
        .catch((error: Error): TGraphQLResponse => {
            return {
                data: null,
                errors: [error],
            };
        });
};
