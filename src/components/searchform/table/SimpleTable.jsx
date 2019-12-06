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

import TableActions from './TableActions';

import {NAMES_RU, ROW_LIMIT} from '../../../constants';

import {styles} from './Table.css';

const getRussian = item => (NAMES_RU[item]? NAMES_RU[item] : item);

class SimpleTable extends Component {
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({page: 0, selected: [], joinedTranslate: '', editMode: false});
  }

  onChangePage = (event, page) => {
    this.setState({page});
  };

  isSelected = (id, selected = this.state.selected) => (selected.indexOf(id) !== -1);


  onCheckboxClick = (id) => {
    const {selected} = this.state;
    const newSelected = this.isSelected(id) ? selected.filter(item => item !== id) : [...new Set([...this.state.selected, id])];
    this.setState({selected: newSelected});
  };


  render() {
    const {classes,  tableData, tableStructure, showCheckbox} = this.props;
    const {page, rowsPerPage} = this.state;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>

          <TableHead>
            <TableRow className={classes.head}>
              {showCheckbox ? <TableCell align='left' key={0}>Выбор</TableCell> : null}
              {tableStructure.map((item, ind) => (
                <TableCell align='left' key={ind}>{getRussian(item)}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, id) => (
              <TableRow tabIndex={-1} key={id + page * rowsPerPage}>
                {showCheckbox ?
                  <TableCell padding="checkbox">
                    <Checkbox checked={this.isSelected(id + page * rowsPerPage)}
                              onClick={() => this.onCheckboxClick(id + page * rowsPerPage)}/>
                  </TableCell>
                  : null}
                {tableStructure.map((item, ind) => (
                  <TableCell padding='dense' align='left' key={ind + ' ' + item.id}>{row[item] ? row[item] : '-'}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[ROW_LIMIT]}
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{native: true}}
                onChangePage={this.onChangePage}
                ActionsComponent={TableActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
  static defaultProps = {
    tableData: [],
    tableStructure: [],
    showCheckBox: false
  };
}

export default withStyles(styles)(SimpleTable);
