const styles = theme => ({
  message: {
    width: '80%',
    margin: '40px auto'
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '20px 2%',
    maxWidth: '50%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    }
  },
  badge: {
    padding: `0 ${theme.spacing.unit}px`,
    textTransform: 'uppercase'
  },
  paper: {
    padding: '8px',
    margin: '8px',
    width: '100%',
    alignSelf: 'center'
  },
  currentWord: {
    width: '80%',
    margin: '20px auto',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '100%',
    }
  },
  form: {
    width: '80%',
    margin: '20px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  }
});
export {styles};
