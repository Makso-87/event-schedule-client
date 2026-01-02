import { CategoriesDocument } from '../generated/graphql';
import { ICategory } from '../interfaces';
import { gqlQuery } from '../utils/gqlQuery';

export const getCategories = async (): Promise<{ categories: ICategory[]; errors: Error[] }> => {
    const { data, errors } = await gqlQuery(CategoriesDocument);

    return { categories: data.categories as ICategory[], errors };
};
