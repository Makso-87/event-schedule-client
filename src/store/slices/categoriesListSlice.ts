import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategoriesState, ICategory } from '../../interfaces';
import { RootState } from '../store';

const initialState: ICategoriesState = {
    categories: [],
};

export const categoriesListSlice = createSlice({
    name: 'categoriesList',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.categories = action.payload;
        },
        addCategory: (state, action: PayloadAction<ICategory>) => {
            state.categories.push(action.payload);
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter((category) => category.id !== action.payload);
        },
    },
});

export const { setCategories, removeCategory, addCategory } = categoriesListSlice.actions;

export const selectCategories = (state: RootState) => state.categoriesList.categories;

export default categoriesListSlice.reducer;
