const styles = theme => ({
  form: {
    width: '80%',
    margin: '20px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  exact: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-14px'
    }
  },
  wrapperFix: {
    position: 'fixed',
    overflowY: 'auto',
    padding: theme.spacing.unit * 0.2
  },
  wrapper: {
    maxHeight: '80vh',
    maxWidth: '90%',
    margin: '0 auto'
  },
  listUnstyled: {
    listStyle: 'none'
  },
  paper: {
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  paperFlex: {
    display: 'flex'
  },
  simpleButton: {
    marginTop: theme.spacing.unit * 0.5,
  }
});

export {styles};
