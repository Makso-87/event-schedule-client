import React from 'react';
import classes from './CommonInfo.module.scss';
export const CommonInfo = () => {
    return (
        <div className={classes.CommonInfo}>
            <h1 className={classes.Title}>Афиша Харе Кришна / Москва</h1>

            <div className={classes.Info}>Единая афиша мероприятий Московской общины вайшнавов</div>
        </div>
    );
};
