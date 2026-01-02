import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvent, IEventsState } from '../../interfaces';
import { RootState } from '../store';

const initialState: IEventsState = {
    events: [],
};

export const eventsListSlice = createSlice({
    name: 'eventsList',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<IEvent[]>) => {
            state.events = action.payload;
        },
    },
});

export const { setEvents } = eventsListSlice.actions;

export const selectEvents = (state: RootState) => state.eventsList.events;

export default eventsListSlice.reducer;
