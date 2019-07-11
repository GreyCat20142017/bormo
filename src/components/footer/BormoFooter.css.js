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
    left: 0,
    right: 0,
    margin: '0 auto',
    width: 'auto'
  },
  fabButton: {
    position: 'relative',
    margin: '0 2px'
  },
  mobileOn: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  mobileOff: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  searchButton: {
    color: 'white'
  }
});

export {styles};
