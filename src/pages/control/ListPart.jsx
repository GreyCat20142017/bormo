import React from 'react';
import classNames from 'classnames';
import {Typography, Paper} from '@material-ui/core';

import {isInactive} from '../pagesCommon';
import {FIELDS, WORDS_PER_LESSON} from '../../constants';

export const ListPart = ({content, classes, currentIndex, startIndex, memorized, switchDisableOne, controlMode}) => (
  <div className={classNames(classes.part)}>
    <ul className={classes.cardList}>
      {content.slice(startIndex, startIndex + Math.floor(WORDS_PER_LESSON / 2)).map((item, ind) =>
        <li className={classes.cardItem} key={ind + startIndex}>
          <Paper
            className={classNames(classes.card, isInactive(ind + startIndex, memorized) ? classes.colorized : null)}>
            <Typography className={classes.title} variant='h6'
                        color='secondary'
                        onClick={() => switchDisableOne(ind + startIndex)} title={item[FIELDS.ORIGIN]}>
              {item[FIELDS.ORIGIN]}
            </Typography>
          </Paper>
        </li>
      )}
    </ul>
  </div>
);
