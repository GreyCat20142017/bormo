import {DRAWER_WIDTH} from "../../constants";

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    marginLeft: DRAWER_WIDTH,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    },
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: `3px solid ${theme.palette.primary.contrastText}`
  },
  fabButtons: {
    position: 'relative',
    zIndex: 1,
    top: -20,
    marginLeft: 'auto',
    width: 'auto'
  },
  fabButton: {
    position: 'relative',
    margin: '0 2px'
  },
  hidden: {
    display: 'none'
  },
  searchButton: {
    color: theme.palette.secondary.main
  },
  status: {
    marginLeft: theme.spacing.unit * 2
  }
});

export {styles};
