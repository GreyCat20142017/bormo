import React from 'react';

import {withStyles} from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ReceiptIcon from '@material-ui/icons/Receipt';


const styles = theme => ({
  asideText: {
    color: 'rgba(0, 0, 0, 0.26)',
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  asideTextActive: {
    color: theme.palette.primary.main,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  asideItem: {
    flexShrink: '1'
  },
  asideIcon: {
    marginRight: '2px'
  }
});

const CourseIcon = ({name, color, fontSize}) => {
  switch (name) {
    case 'basic':
      return (<ReceiptIcon color={color} fontSize={fontSize}/>)
    case 'ABC':
      return (<FormatColorTextIcon color={color} fontSize={fontSize}/>)
    case 'book':
      return (<LibraryBooksIcon color={color} fontSize={fontSize}/>)
    case 'other':
      return (<InboxIcon color={color} fontSize={fontSize}/>)
    default:
      return (<InboxIcon color={color} fontSize={fontSize}/>)
  }
}

class BormoCourse extends React.Component {
  static CourseIcon = CourseIcon;

  onCourseClick = () => this.props.onCourseChange(this.props.item.name, this.props.ind);

  render () {
    const {currentCourse, item, classes} = this.props;

    return (
      <ListItem button key={item.name} title={item.name.toUpperCase()} onClick={this.onCourseClick}
                className={classes.asideItem}>
        <ListItemIcon className={classes.asideIcon}>
          <CourseIcon name={item.name} color={(item.name === currentCourse) ? 'primary' : 'disabled'} fontSize='small'/>
        </ListItemIcon>
        <ListItemText primary={item.name}
                      className={item.name === currentCourse ? classes.asideTextActive : classes.asideText}
                      disableTypography={true}/>
      </ListItem>
    )
  }
}

export default withStyles(styles)(BormoCourse);
