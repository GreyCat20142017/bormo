import React from 'react';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const audio = new Audio();

const playSound = (url) =>  {
  if (url) {
    try {
      audio.src=url;
      audio.play();
    }
    catch (e) {
    }
  }
};

const SkyResults = ({data, classes}) => {

  const [first, ...phrases] = data && Array.isArray(data) ? data : [[], []];
  const meanings = first.meanings;
  const ok = data &&  Array.isArray(data) && Array.isArray(meanings) && meanings.length > 0;
  const basicInfo = ok ? meanings[0] : {};
  const word = ok ? first.text : '';

  if (ok) {
  return (
      <div className={classNames(classes.form, classes.wrapperFix)}>
        <div className={classNames( classes.form, classes.wrapper)}>
          <Paper className={classNames(classes.paperFlex, classes.paper)}>
            <Typography variant='h6'> Слово: {word}  [ {basicInfo.transcription} ]</Typography>
            <ButtonBase className={classes.simpleButton} onClick={() => playSound(basicInfo.soundUrl)}><VolumeUpIcon/></ButtonBase>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant='h6'>Перевод:</Typography>
          <ul className={classes.listUnstyled}>
            {meanings.map((meaning) =>
              <li key={meaning.id}>
                <Typography  variant='body2' className={classes.simpleButton}>
                  {meaning.translation.text} {meaning.translation.note ?  '(' + meaning.translation.note + ')' : ''}
                </Typography>
              </li>)}
          </ul>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant='h6'>Примеры:</Typography>
            <ul className={classes.listUnstyled}>
            {phrases.map((meaning) =>
              <li key={meaning.id}>
                  <Typography  variant='body2' className={classes.simpleButton}>
                    {meaning.text} {meaning.meanings[0] ?  '(' + meaning.meanings[0].translation.text  + ')' : ''}
                  </Typography>
              </li>)}
          </ul>
        </Paper>
        </div>
      </div>
  )
  } else {
    return <Typography variant='h6'>Ничего не найдено.</Typography>
  }
}

export default  SkyResults;
