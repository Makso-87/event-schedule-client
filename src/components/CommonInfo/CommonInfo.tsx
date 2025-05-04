import React from 'react';
import classes from './CommonInfo.module.scss';
export const CommonInfo = () => {
    return (
        <div className={classes.CommonInfo}>
            <h1 className={classes.Title}>Афиша Харе Кришна / Москва</h1>

            <div className={classes.Info}>
                Единая афиша мероприятий Московской общины вайшнавов. Здесь вы можете найти информацию о ближайших
                событиях в формате календаря. Сайт Афиши <a href='http://afisha-hk.ru/'>http://afisha-hk.ru/</a>
            </div>
        </div>
    );
};
