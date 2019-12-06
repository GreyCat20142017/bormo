import React, {PureComponent} from 'react';
import {MenuItem, FormControl, Select, withStyles} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  rootfromConfig: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 100,
    '& ::before': {
      borderBottom: '1px solid white'
    }
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  light: {
    color: theme.palette.primary.contrastText,
    '& *': {
      color: theme.palette.primary.contrastText,
    }
  },
  dark: {}
});

class BormoThemeSelect extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {choice: props.currentTheme.themeKey};
  }

  onThemeChange = evt => {
    const newTheme = evt.target.value;
    this.setState({[evt.target.name]: newTheme});
    this.props.onThemeSelect(newTheme);
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.setState({choice: nextProps.currentTheme.themeKey});
  }

  render() {
    const {classes, themes, fromConfig = false, light = false} = this.props;

    return (
      <form className={fromConfig ? classes.rootFromConfig : classes.root} autoComplete='off'>
        <FormControl className={light ? classes.light : classes.dark}>
          <Select  variant={'standard'}
                  value={this.state.choice}
                  onChange={this.onThemeChange}
                  inputProps={{
                    name: 'choice'
                  }}
                  title='Выбор темы интерфейса'>
            {themes.length === 0 ? null : themes.map(el =>
              <MenuItem className={classes.item} value={el.themeKey} key={el.themeKey}
                        title={el.themeDescription}>{el.themeName}</MenuItem>
            )}
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(BormoThemeSelect);
