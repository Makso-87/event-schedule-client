import React, { FC } from 'react';
import classes from './SiteWrapper.module.scss';
import { ISiteWrapper } from '../../interfaces';

export const SiteWrapper: FC<ISiteWrapper> = (props) => {
    const { children } = props;

    return <div className={classes.SiteWrap}>{children}</div>;
};
