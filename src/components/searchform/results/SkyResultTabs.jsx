import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SimpleTable from '../table/SimpleTable';
import {EXCLUDED_COLUMNS} from '../../../constants';

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

const getTableStructure = (cell, excludedColumns) => (
  Object.keys(cell).filter(item => !(excludedColumns.indexOf(item) !== -1))
);

class SkyResultTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {classes, skyData} = this.props;
    const {value} = this.state;
    const meaningsColumns = skyData.meanings.length > 0 ? getTableStructure(skyData.meanings[0], EXCLUDED_COLUMNS) : [];
    const phrasesColumns = skyData.phrases.length > 0 ? getTableStructure(skyData.phrases[0], [...EXCLUDED_COLUMNS, 'translationNote']) : [];

    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Перевод"/>
            <Tab label="Примеры"/>
          </Tabs>
        </Paper>
        {value === 0 && <SimpleTable tableData={skyData.meanings} tableStructure={meaningsColumns}/>}
        {value === 1 && <SimpleTable tableData={skyData.phrases} tableStructure={phrasesColumns}/>}
      </React.Fragment>
    );
  }
}


export default withStyles(styles)(SkyResultTabs);
