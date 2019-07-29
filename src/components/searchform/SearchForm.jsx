import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core';

import SimpleTable from './table/SimpleTable';
import SkyResults from './results/SkyResults';
import {DATA_SOURCES, KEY_CODES, SKYENG_URL, TRANSLATE_SOURCES} from '../../constants';

import {styles} from './SearchForm.css';

const mapSkyEngData = (data, onlySkyEng) => {
  if (onlySkyEng) {
    return [...data];
  };
  let result = [];
  if (data && data[0] && data[0].meanings) {
    const words = data[0].meanings;
    result = [...new Set(words.map(item => item.translation.text))];
  }
  return result.map(item => ({word: '', translate: item}));
};

const mapDbData = (data) => ([...data.content]);

const mapApiData = (data, translateSource, onlySkyeng = false) => ((translateSource === TRANSLATE_SOURCES.SKYENG) ?
  mapSkyEngData(data, onlySkyeng) :
  mapDbData(data));

const CurrentTable = ({onlySkyEng, ...rest}) => (onlySkyEng ?
  <SkyResults {...rest}/> :
  <SimpleTable {...rest}/>
)

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.bormoSpeaker = this.props.bormoSpeaker;
    this.state = {
      searchText: '',
      skyEng: props.onlySkyEng ? true : false,
      searchResult: null,
      currentTranslateSource: null,
      exact: true
    };
  }

  onSearch = async () => {
    const {skyEng, searchText, exact} = this.state;
    const {onlySkyEng} = this.props;
    let translateSource = null;
    let searchResult = null;
    const apiUrl = skyEng ? SKYENG_URL : DATA_SOURCES.PHP_LOCAL.SEARCH;
    const apiParams = skyEng ? {search: searchText} : {word: searchText, exact: +exact};
    try {
      let res = await axios.get(apiUrl, {params: apiParams});
      translateSource = skyEng ? TRANSLATE_SOURCES.SKYENG : TRANSLATE_SOURCES.DB;
      searchResult = mapApiData(res.data, translateSource, onlySkyEng);
    } catch (err) {
    }

    this.setState({
      searchResult: searchResult, currentTranslateSource: translateSource
    });
  }

  onKeyPress = (evt) => {
    if (evt.keyCode === KEY_CODES.ENTER) {
      evt.preventDefault();
      this.onSearch();
    }
  }

  onWordChange = (evt) => {
    const value = evt.target.value;
    if ((evt.keyCode === KEY_CODES.ENTER) ) {
      this.onSearch();
    } else {
      this.setState({searchText: value});
    }
  }

  onOptionChange = name => event => {
    this.setState({[name]: event.target.checked});
  };

  render() {
    const {classes, onlySkyEng} = this.props;
    const {searchText, skyEng, searchResult, currentTranslateSource, exact} = this.state;
    return (
      <Fragment>

        <form className={classes.form} onSubmit={this.onSearch}>
          <Typography variant={'h5'}>{'Поиск ' + (onlySkyEng ? '(Skyeng)' : '')}</Typography>
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
            {onlySkyEng ? null :
            <FormControlLabel
              control={<Switch checked={skyEng} onChange={this.onOptionChange('skyEng')} value={skyEng}
                               color='primary' name='skyEng'/>}
              label='Искать в SkyEng (on - в skyEng, off - в БД)'
            />
            }
          </FormGroup>

          <Button size='small' variant='contained' color='secondary' onClick={onlySkyEng ?  this.onSearch : this.onSearch}
                  className={classes.button}>
            {'Искать ' + (skyEng ? 'в skyEng' : 'в БД')}
          </Button>
          {skyEng ? null :
            <FormControlLabel className={classes.exact}
                              control={<Switch checked={exact} onChange={this.onOptionChange('exact')} value={exact}
                                               color='primary' name='exact'/>}
                              label='Искать точное совпадение (on - точное, off - неточное)'
            />
          }
        </form>

        {searchResult ?  <CurrentTable data={searchResult} currentTranslateSource={currentTranslateSource} onlySkyEng={onlySkyEng} classes={classes}/> : null }

      </Fragment>

    )
  }
}
export default withStyles(styles)(SearchForm);
