import React from 'react';
import classes from './ImageBlock.module.scss';
import shrilaPrabhupda from '../../images/shrila_prabhupada.webp';
export const ImageBlock = () => {
    return (
        <div className={classes.ImageBlock}>
            <img src={shrilaPrabhupda} alt='' className={classes.Image} />
        </div>
    );
};
