import React, { useEffect, useState } from 'react';
import classes from './Main.module.scss';
import { ImageBlock } from '../ImageBlock/ImageBlock';
import { SiteWrapper } from '../SiteWrapper/SiteWrapper';
import { CommonInfo } from '../CommonInfo/CommonInfo';
import { Tabs } from '../Tabs/Tabs';
import { NewCalendar } from '../NewCalendar/NewCalendar';
import { getEvents } from '../../api/getEvents';
import { setEvents } from '../../store/slices/eventsListSlice';
import { useAppDispatch } from '../../hooks/redux-toolkit-hooks';
import { getCategories } from '../../api/getCategories';
import { setCategories } from '../../store/slices/categoriesListSlice';

const mode = 'calendarOnly';
export const Main = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            const eventsList = await getEvents();
            dispatch(setEvents(eventsList));

            const { categories } = await getCategories();
            dispatch(setCategories(categories));
        })();
    });

    return (
        <main className={classes.Main}>
            <ImageBlock />
            <SiteWrapper>
                <CommonInfo />
                {mode === 'calendarOnly' ? <NewCalendar /> : <Tabs />}
            </SiteWrapper>
        </main>
    );
};
