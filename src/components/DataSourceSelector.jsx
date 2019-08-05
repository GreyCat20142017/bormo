import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';

import {withStyles} from '@material-ui/core/styles';

import {DATA_SOURCES} from '../constants';

const styles = theme => ({
  fixed: {
    position: 'fixed',
    bottom: '10px',
    right:  0,
  },
});

class DataSourceSelector extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  handleSelect = (sourceKey) => {
    this.setState(() => ({anchorEl: null}));
    this.props.onSelectDataSource(sourceKey);
  };

  render() {
    const {anchorEl} = this.state;
    const {fixed, classes} = this.props;
    return (
      <div  className={fixed ? classes.fixed : ''}>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true" color='secondary'
          onClick={this.handleClick}
          title={'Выбор источника данных'}
        >
          <SettingsIcon/>
        </Button>
        <Menu
          id="data-source-selector"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {Object.keys(DATA_SOURCES).filter(key => !DATA_SOURCES[key].disabled).map((item, ind) => (
            <MenuItem key={ind} onClick={() => this.handleSelect(item)} title={item}>
              {DATA_SOURCES[item]['COMMENT']}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  static defaultProps = {
    fixed: false
  };
}

export default withStyles(styles)(DataSourceSelector);
