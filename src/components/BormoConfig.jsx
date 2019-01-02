import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import { withStyles } from '@material-ui/core/styles';

import SimpleSlider from './SimpleSlider'
import { voiceParams } from '../constants';


const styles = theme => ({
  configWrapper: {
    margin: '20px auto',
    padding: theme.spacing.unit
  },
  configButton: {
    margin: theme.spacing.unit
  },
  configGroup: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
});

class BormoConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props.config, ...props.voiceConfig, noSound: props.noSound};
  }

  onOptionChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onSliderChange = (name, value) => {
    this.setState({ [name]: value});
  };

  sayTest = () => {

  }

  render() {
   const {isConfigOpen, classes} = this.props;
   const {
    instantStart, instantNextMode, countErrorAtPrompt,
    onlyEnglish, pitch, volume, noSound} = this.state;

   if (isConfigOpen) {
    return (
      <Dialog
        fullScreen
        open={isConfigOpen}
      >

      <div className={classes.configWrapper}>
        <Typography variant='h5' className={classes.configGroup}>Настройка приложения</Typography>
        <Typography variant='caption' className={classes.configGroup}>Общие параметры</Typography>
        <Paper>
          <FormGroup className={classes.configGroup}>
          <FormControlLabel
            control={
              <Switch checked={instantStart}
                onChange={this.onOptionChange('instantStart')}
                value='instantStart'
                color='primary'
              />
            }
            label='начинать выполнение выбранного режима без ожидания нажатия кнопки Старт'
          />
          <FormControlLabel
            control={
              <Switch
                checked={instantNextMode}
                onChange={this.onOptionChange('instantNextMode')}
                value='instantNextMode'
                color='primary'
              />
            }
            label='начинать выполнение следующего режима после окончания текущего'
          />
          <FormControlLabel
            control={
              <Switch
                checked={countErrorAtPrompt}
                onChange={this.onOptionChange('countErrorAtPrompt')}
                value='countErrorAtPrompt'
                color='primary'
              />
            }
            label='увеличивать счетчик ошибок при запросе подсказки'
          />
        </FormGroup>
      </Paper>
      <Typography variant='caption' className={classes.configGroup}>Параметры звука</Typography>
      <Paper>
        <FormGroup  className={classes.configGroup}>
           <FormControlLabel
            control={<Switch checked={onlyEnglish} onChange={this.onOptionChange('onlyEnglish')} value='onlyEnglish' color='primary'/>            }
            label='при доступности синтеза речи озвучивать только английский'
          />

         <FormControlLabel
            control={<Switch checked={noSound} onChange={this.onOptionChange('noSound')} value='noSound' color='primary'/>}
            label='беззвучный режим'
          />
          <SimpleSlider name='volume' params={voiceParams.volume} value={volume} onSliderChange={this.onSliderChange}/>
          <SimpleSlider name='pitch' params={voiceParams.pitch} value={pitch} onSliderChange={this.onSliderChange}/>

        </FormGroup>
        <Button variant='contained' color='secondary' onClick={this.sayTest} className={classes.configButton}>
          Тест
          <VolumeUpIcon className={classes.rightIcon} fontSize='small'/>
        </Button>
      </Paper>

      <Button variant='contained' color='primary' onClick={this.props.closeConfig} className={classes.configButton}> Сохранить и закрыть </Button>
      <Button variant='contained' color='secondary' onClick={this.props.closeConfig} className={classes.configButton}> Отмена </Button>
   </div>
    </Dialog>)
   } else {
    return null
   }
 }
}

export default withStyles(styles)(BormoConfig);



