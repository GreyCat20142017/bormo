import {DRAWER_WIDTH} from './constants';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch'
  },
  drawer: {
    padding: '0',
    [theme.breakpoints.up('sm')]: {
      padding: '20px',
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: DRAWER_WIDTH,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    minHeight: '80vh',
    [theme.breakpoints.up('sm')]: {
      minHeight: '90vh'
    }
  },
  status: {
    position: 'fixed',
    bottom: '10px',
    left: '20px',
    [theme.breakpoints.up('sm')]: {
      left: '280px'
    }
  },
  underlined: {
    borderBottom: `2px solid ${theme.palette.primary.light}`
  }

});

export {styles};
