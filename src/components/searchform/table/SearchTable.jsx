import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';

import TableActions from './TableActions';

import {TRANSLATE_SOURCES, ROW_LIMIT} from '../../../constants';
import TextField from '@material-ui/core/TextField';

import {styles} from './Table.css';

class SearchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: ROW_LIMIT,
      selected: [],
      joinnedTranslate: '',
      editMode: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({page: 0, selected: [], joinedTranslate: '', editMode: false});
  }

  onChangePage = (event, page) => {
    this.setState({page});
  };

  isSelected = (id, selected = this.state.selected) => (selected.indexOf(id) !== -1);


  onCheckboxClick = (id) => {
    const {selected} = this.state;
    const newSelected = this.isSelected(id) ? selected.filter(item => item !== id) : [...new Set([...this.state.selected, id])];
    const translate = this.props.data.map(item => item.translate).filter((item, ind) => (this.isSelected(ind, newSelected))).join(', ');
    this.setState({selected: newSelected, joinedTranslate: translate});
  };

  onSwitchEditMode = () => {
    this.setState({editMode: !this.state.editMode});
  };

  onTranslateChange = (evt) => {
    const value = evt.target.value;
    this.setState({joinedTranslate: value});
  };

  render() {
    const {classes, data, currentTranslateSource} = this.props;
    const {page, rowsPerPage, joinedTranslate, selected, editMode} = this.state;
    const showWord = (currentTranslateSource === TRANSLATE_SOURCES.DB);

    return (
      <Paper className={classes.form}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.head}>
              <TableCell align='left'>Выбор</TableCell>
              {showWord ? <TableCell align='left'>Слово</TableCell> : null}
              <TableCell align='left'>Перевод</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, id) => (
              <TableRow tabIndex={-1} key={id + page * rowsPerPage}>
                <TableCell padding="checkbox">
                  <Checkbox checked={this.isSelected(id + page * rowsPerPage)}
                            onClick={() => this.onCheckboxClick(id + page * rowsPerPage)}/>
                </TableCell>
                {showWord ? <TableCell align='left'>{row.word}</TableCell> : null}
                <TableCell align='left'>{row.translate}</TableCell>
              </TableRow>
            ))}


          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[ROW_LIMIT]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{native: true}}
                onChangePage={this.onChangePage}
                ActionsComponent={TableActions}
              />
            </TableRow>
          </TableFooter>
        </Table>

        {selected.length > 0 ?
          <div className={classes.joinedPanel}>
            <IconButton color='inherit' fontSize='small' disabled={true}
                        title={'Сохранить в БД (пользовательские уроки, раздел OWN)'}>
              <AddIcon/>
            </IconButton>
            <IconButton color='inherit' fontSize='small' title={'Переключить режим изменения подготовленного перевода'}
                        onClick={this.onSwitchEditMode}>
              <CreateIcon/>
            </IconButton>
            <TextField
              id='joined'
              title={'Заготовка для добавления в БД'}
              value={joinedTranslate}
              fullWidth
              margin='normal'
              disabled={!editMode}
              onChange={this.onTranslateChange}
            />
          </div>
          : null
        }
      </Paper>
    );
  }
}


export default withStyles(styles)(SearchTable);
