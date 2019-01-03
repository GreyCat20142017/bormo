import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Bred extends React.Component {

  constructor(props) {
    super(props);
    this.state = {choice: props.currentTheme.themeKey};
  }

  onThemeChange = evt => {
    const newTheme = evt.target.value;
    this.setState({ [evt.target.name]: newTheme});
    this.props.onThemeSelect(newTheme);
  };

  render() {
    const { classes, themes } = this.props;

    return (
      <form className={classes.root} autoComplete='off'>
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.choice}
            onChange={this.onThemeChange}
            inputProps={{
              name: 'choice'
            }}
            title='Выбор темы интерфейса'
          >
           {themes.length === 0 ?  null : themes.map(el =>
            <MenuItem className={classes.item} value={el.themeKey} key={el.themeKey} title={el.themeDescription}>{el.themeName}</MenuItem>
            )}
          </Select>
        </FormControl>
      </form>
      )
    }
  }

export default withStyles(styles)(Bred);