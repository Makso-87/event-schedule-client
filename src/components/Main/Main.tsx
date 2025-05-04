import React from 'react';
import classes from './Main.module.scss';
import { ImageBlock } from '../ImageBlock/ImageBlock';
import { SiteWrapper } from '../SiteWrapper/SiteWrapper';
import { CommonInfo } from '../CommonInfo/CommonInfo';
import { Tabs } from '../Tabs/Tabs';
import { NewCalendar } from '../NewCalendar/NewCalendar';

const mode = 'calendarOnly';
export const Main = () => {
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
