import React, {Component} from 'react';

import axios from 'axios';
import {withStyles} from '@material-ui/core';
import {styles} from './Search.css.js';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';

import {DATA_SOURCES, SKYENG_URL} from '../../constants';

class Search extends Component {

  constructor(props) {
    super(props);
    this.bormoSpeaker = this.props.bormoSpeaker;
    this.state = {searchText: '', skyEng: false, searchResult: []};

  }

  onSearchClick = async () => {
    const {skyEng, searchText} = this.state;
    const searchResult = [];
    const apiUrl = skyEng ? SKYENG_URL : DATA_SOURCES.PHP_LOCAL.SEARCH;
    const apiParams = skyEng ? {search: searchText} : {word: searchText};
    try {
      let res = await axios.get(apiUrl, {params: apiParams});
      console.log(res);
      // result = res && (res.status === 200) ? res.data : [];
    } catch (err) {

    }

    this.setState({searchResult: searchResult});
  }

  onWordChange = (evt) => {
    const value = evt.target.value;
    this.setState({searchText: value});
  }

  onOptionChange = name => event => {
    this.setState({[name]: event.target.checked});
  };

  render() {
    const {classes} = this.props;
    const {searchText, skyEng} = this.state;
    return (
      <form className={classes.form} onSubmit={this.onTranslateValidate}>
        <Typography variant={"h4"}>Поиск</Typography>
        <FormGroup>
          <TextField
            required
            id='word'
            label={'Слово для поиска'}
            value={searchText}
            fullWidth
            margin='normal'
            onChange={this.onWordChange}
          />
          <FormControlLabel
            control={<Switch checked={skyEng} onChange={this.onOptionChange('skyEng')}  value={skyEng}
                             color='primary' name='skyEng'/>}
            label='Искать в SkyEng (on - в skyEng, off - в БД)'
          />
        </FormGroup>

        <Button size='small' variant='contained' color='secondary' onClick={this.onSearchClick}
                className={classes.configButton}>
          {'Искать в ' +  (skyEng ? 'в skyEng' : 'в БД')}
        </Button>
      </form>
    )
  }
}


export default withStyles(styles)(Search);
