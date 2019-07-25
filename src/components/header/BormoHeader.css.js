const styles = (theme) => ({
  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  menu: {
    marginRight: '0',
    justifyContent: 'space-between'
  },
  switchable: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  navItem: {
    color: 'rgba(0, 0, 0, 0.87)',
    textDecoration: 'none',
    outline: 'none'
  },
  menuItem : {
    padding: '16px',
    marginRight: 0,
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    height: '24px',
    overflow: 'hidden',
    fontSize: '1rem',
    fontWeight: '400',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    lineHeight: '1.5em',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    outline: 'none',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
    '&:focus': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  }
});

export {styles};
