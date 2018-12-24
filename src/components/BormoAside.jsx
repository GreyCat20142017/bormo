import React from 'react';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/Inbox';

import { withStyles } from '@material-ui/core/styles';

import { sections } from '../constants';

const styles = theme => ({
  aside: {
    display: 'flex',   
  },

  asideText: {
   [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  }

});

class BormoAside extends React.Component {
   render() {
    const { classes} = this.props;

    const aside = (
      <div>
        <Divider />
        <List>
        	  {sections.map((item, index) => (
            <ListItem button key={item.name} title={item.name}>
              <ListItemIcon>{ <InboxIcon  color='primary' fontSize='small'/> }</ListItemIcon>    
              <ListItemText primary={item.name} className={classes.asideText}/>          
            </ListItem>
          )) }
        </List>
        <Divider />       
      </div>
    );

    return (
       <nav className={classes.aside}>
          {aside}            
       </nav>        
     ) 
    }  
	}
   
   export default withStyles(styles,  { withTheme: true })(BormoAside);