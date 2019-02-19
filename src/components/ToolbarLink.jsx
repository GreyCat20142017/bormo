import React from 'react';
import {NavLink} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  tabActive: {
    borderBottom: '2px solid',
    borderColor: theme.palette.primary.contrastText
  }
});

const ToolbarLink = ({classes, children, ...rest}) => (
  <NavLink
    activeClassName={classes.tabActive}
    {...rest}
  >
    {children}
  </NavLink>
);


export default withStyles(styles)(ToolbarLink);
