import React, {Component, Fragment} from 'react';

import axios from 'axios';
import {withStyles} from '@material-ui/core';
import {styles} from './Search.css.js';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import SimpleTable from '../../components/table/SimpleTable';

import {DATA_SOURCES, KEY_CODES, SKYENG_URL, TRANSLATE_SOURCES} from '../../constants';


const mapSkyEngData = (data) => {
  let result = [];
  if (data && data[0] && data[0].meanings) {
    const words = data[0].meanings;
    result = [...new Set(words.map(item => item.translation.text))];
  }
  return result.map(item => ({word: '', translate: item}));
};

const mapDbData = (data) => ([...data.content]);

const mapApiData = (data, translateSource) => ((translateSource === TRANSLATE_SOURCES.SKYENG) ? mapSkyEngData(data) : mapDbData(data));

class Search extends Component {

  constructor(props) {
    super(props);
    this.bormoSpeaker = this.props.bormoSpeaker;
    this.state = {
      searchText: '',
      skyEng: false,
      searchResult: null,
      currentTranslateSource: null,
      exact: true
    };
  }

  onSearchClick = async () => {
    const {skyEng, searchText, exact} = this.state;
    let translateSource = null;
    let searchResult = null;
    const apiUrl = skyEng ? SKYENG_URL : DATA_SOURCES.PHP_LOCAL.SEARCH;
    const apiParams = skyEng ? {search: searchText} : {word: searchText, exact: +exact};
    try {
      let res = await axios.get(apiUrl, {params: apiParams});
      translateSource = skyEng ? TRANSLATE_SOURCES.SKYENG : TRANSLATE_SOURCES.DB;
      searchResult = mapApiData(res.data, translateSource);

    } catch (err) {

    }

    this.setState({
      searchResult: searchResult, currentTranslateSource: translateSource
    });
  }

  onKeyPress = (evt) => {
    if (evt.keyCode === KEY_CODES.ENTER) {
      evt.preventDefault();
      this.onSearchClick();
    }
  }

  onWordChange = (evt) => {
    const value = evt.target.value;
    if ((evt.keyCode === KEY_CODES.ENTER) ) {
      this.onSearchClick();
    } else {
      this.setState({searchText: value});
    }
  }

  onOptionChange = name => event => {
    this.setState({[name]: event.target.checked});
  };

  render() {
    const {classes} = this.props;
    const {searchText, skyEng, searchResult, currentTranslateSource, exact} = this.state;
    return (
      <Fragment>

        <form className={classes.form} onSubmit={this.onTranslateValidate}>
          <Typography variant={'h5'}>Поиск</Typography>
          <FormGroup>
            <TextField
              required
              id='word'
              label={'Слово для поиска'}
              value={searchText}
              fullWidth
              margin='normal'
              onKeyDown={this.onKeyPress}
              onChange={this.onWordChange}
            />
            <FormControlLabel
              control={<Switch checked={skyEng} onChange={this.onOptionChange('skyEng')} value={skyEng}
                               color='primary' name='skyEng'/>}
              label='Искать в SkyEng (on - в skyEng, off - в БД)'
            />
          </FormGroup>

          <Button size='small' variant='contained' color='secondary' onClick={this.onSearchClick}
                  className={classes.button}>
            {'Искать в ' + (skyEng ? 'в skyEng' : 'в БД')}
          </Button>
          {skyEng ? null :
            <FormControlLabel className={classes.exact}
              control={<Switch checked={exact} onChange={this.onOptionChange('exact')} value={exact}
                               color='primary' name='exact'/>}
              label='Искать точное совпадение (on - точное, off - неточное)'
            />
          }
        </form>

        {searchResult ?
          <SimpleTable data={searchResult} currentTranslateSource={currentTranslateSource}/>
          : null
        }

      </Fragment>

    )
  }
}


export default withStyles(styles)(Search);
