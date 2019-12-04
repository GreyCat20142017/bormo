import React, {PureComponent} from 'react';
import axios from 'axios';
import {Button, Typography, FormGroup, FormControlLabel, TextField, Switch, withStyles} from '@material-ui/core';

import SearchTable from './table/SearchTable';
import SkyResults from './results/SkyResults';
import {DATA_SOURCES, KEY_CODES, SKYENG_URL, TEST_KEY, TRANSLATE_SOURCES} from '../../constants';
import {styles} from './SearchForm.css';

const mapSkyEngData = (data, onlySkyEng) => {
  if (onlySkyEng) {
    return [...data];
  }
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
    <SearchTable {...rest}/>
);

class SearchForm extends PureComponent {

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
    const {onlySkyEng, APIkey} = this.props;
    const apiUrl = skyEng ? SKYENG_URL : DATA_SOURCES[APIkey]['SEARCH'];
    const apiParams = skyEng ? {search: searchText} : {word: searchText, exact: +exact};
    let translateSource = null;
    let searchResult = null;
    if (searchText.trim() !== '') {
      if (skyEng || APIkey !== TEST_KEY) {
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
    }
  };

  onKeyPress = (evt) => {
    if (evt.keyCode === KEY_CODES.ENTER) {
      evt.preventDefault();
      this.onSearch();
    }
  };

  onWordChange = (evt) => {
    const value = evt.target.value;
    if ((evt.keyCode === KEY_CODES.ENTER)) {
      this.onSearch();
    } else {
      this.setState({searchText: value});
    }
  };

  onOptionChange = name => event => {
    this.setState({[name]: event.target.checked});
  };

  render() {
    const {classes, onlySkyEng, APIkey} = this.props;
    const {searchText, skyEng, searchResult, currentTranslateSource, exact} = this.state;
    const isTestData = !skyEng && !onlySkyEng && (APIkey === TEST_KEY);
    return (
      <div className={classes.search}>

        <form className={classes.form} onSubmit={this.onSearch}>
          <Typography className={classes.formTitle}
                      variant={'h5'}>{'Поиск ' + (onlySkyEng ? '(Skyeng)' : '')}</Typography>
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

          <Button size='small' variant='contained' color='secondary' disabled={isTestData}
                  onClick={onlySkyEng ? this.onSearch : this.onSearch}
                  className={classes.button}
                  title={'Поиск в выбранном источнике'}>
            {'Поиск ' + (skyEng ? 'в skyEng' : 'в БД') + (isTestData ? '  отключен: тестовые данные!' : '')}
          </Button>
          {skyEng ? null :
            <FormControlLabel className={classes.exact}
                              control={<Switch checked={exact} onChange={this.onOptionChange('exact')} value={exact}
                                               color='primary' name='exact' disabled={isTestData}/>}
                              label='Искать точное совпадение (on - точное, off - неточное)'
            />
          }
        </form>

        {searchResult ?
          <CurrentTable data={searchResult} currentTranslateSource={currentTranslateSource} onlySkyEng={onlySkyEng}
                        classes={classes}/> : null}

      </div>

    );
  }

  static defaultProps = {
    APIkey: TEST_KEY
  };
}

export default withStyles(styles)(SearchForm);
