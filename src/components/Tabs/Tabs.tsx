import React, { MouseEvent, useState } from 'react';
import classes from './Tabs.module.scss';
import { ETabType } from '../../enums';
import { EventsList } from '../EventsList/EventsList';
import { Categories } from '../Categories/Categories';
import { NewCalendar } from '../NewCalendar/NewCalendar';

const tabs = [
    {
        name: 'Все события',
        type: ETabType.Events,
    },
    {
        name: 'Календарь',
        type: ETabType.Calendar,
    },
    {
        name: 'Категории',
        type: ETabType.Categories,
    },
];

const tabsContent = {
    [ETabType.Events]: <EventsList />,
    [ETabType.Calendar]: <NewCalendar />,
    [ETabType.Categories]: <Categories />,
};

export const Tabs = () => {
    const [activeTab, setActiveTab] = useState(ETabType.Events);
    const changeTab = (event: MouseEvent, tabType: ETabType) => {
        setActiveTab(tabType);
    };

    return (
        <div className={classes.Tabs}>
            <div className={classes.TabBar}>
                {tabs.map((tab) => {
                    let classList = classes.TabItem;

                    if (tab.type === activeTab) {
                        classList += ` ${classes.Active}`;
                    }

                    return (
                        <button onClick={(e) => changeTab(e, tab.type)} className={classList}>
                            {tab.name}
                        </button>
                    );
                })}
            </div>

            <div className={classes.Content}>{tabsContent[activeTab]}</div>
        </div>
    );
};
