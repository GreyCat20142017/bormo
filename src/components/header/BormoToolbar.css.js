const styles = theme => ({
  menuList: {
    display: 'flex'
  },

  asideText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  text: {
    marginLeft: '7px',
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex'
    }
  },
  menuLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    textDecoration: 'none',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.dark
    },
    '&:focus': {
      boxShadow: `0 0 0 1px ${theme.palette.primary.light} inset`,
      backgroundColor: theme.palette.primary.light
    },
    '&:active': {
      backgroundImage: 'linear-gradient(to bottom, ' +
        theme.palette.primary.light + ' 0%, ' +
        theme.palette.primary.main + ' 50%, ' +
        theme.palette.primary.light + ' 100%)',
      boxShadow: '0 3px 5px 2px ' + theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    }
  },

  mobileOn: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex'
    }
  },

  mobileOff: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },

  burgerOpened: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  navItem: {
    color: 'rgba(0, 0, 0, 0.87)',
    textDecoration: 'none',
    outline: 'none',
    '&.active *': {
      color: 'red'
    }
  }
});

export {styles};
