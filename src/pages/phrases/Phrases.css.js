const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  wordsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    listStyle: 'none',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: 0
    }
  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  wordButton: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 1
  },
  budge: {
    padding: '0',
    marginTop: '0'
  },
  typo: {
    '&:first-letter': {
      textTransform: 'capitalize'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem'
    }
  }
});

export {styles};
