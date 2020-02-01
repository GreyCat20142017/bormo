import React from 'react';
import {NavLink} from 'react-router-dom';

const ToolbarLink = ({classes, children, ...rest}) => (
  <NavLink activeStyle={{color: 'red'}}  classes={classes} {...rest} >
    {children}
  </NavLink>
);


export default (ToolbarLink);
