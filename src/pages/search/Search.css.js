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
  }
});

export {styles};
