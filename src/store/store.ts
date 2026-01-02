import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesListSlice';
import eventsReducer from './slices/eventsListSlice';

export const store = configureStore({
    reducer: {
        eventsList: eventsReducer,
        categoriesList: categoriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
