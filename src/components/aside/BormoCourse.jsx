import React, {PureComponent} from 'react';
import {ListItem, ListItemIcon, ListItemText, withStyles} from '@material-ui/core';
import {Inbox, FormatColorText, LibraryBooks, Receipt} from '@material-ui/icons';
import {styles} from './BormoCourse.css';

const CourseIcon = ({name, color, fontSize}) => {
  switch (name) {
    case 'basic':
      return (<Receipt color={color} fontSize={fontSize}/>)
    case 'ABC':
      return (<FormatColorText color={color} fontSize={fontSize}/>)
    case 'book':
      return (<LibraryBooks color={color} fontSize={fontSize}/>)
    case 'other':
      return (<Inbox color={color} fontSize={fontSize}/>)
    default:
      return (<Inbox color={color} fontSize={fontSize}/>)
  }
}

class BormoCourse extends PureComponent {
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
