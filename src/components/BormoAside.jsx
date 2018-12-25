import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/Inbox';

import { withStyles } from '@material-ui/core/styles';

import { sections } from '../data';

const styles = theme => ({
  aside: {
    display: 'flex',
  },

  asideText: {
   [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  }

});

class BormoAside extends React.Component {
   render() {
    const { classes} = this.props;

    const aside = (
        <List>
        	  {sections.map((item, index) => (
            <ListItem button key={item.name} title={item.name}>
              <ListItemIcon>{ <InboxIcon  color='primary' fontSize='small'/> }</ListItemIcon>
              <ListItemText primary={item.name} className={classes.asideText}/>
            </ListItem>
          )) }
        </List>
    );

    return (
       <nav className={classes.aside}>
          {aside}
       </nav>
     )
    }
	}

   export default withStyles(styles,  { withTheme: true })(BormoAside);
