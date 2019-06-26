const styles = theme => ({
  parts: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between'
  },
  part: {
    width: '47.7%'
  },
  cardList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    paddingLeft: '2.2%',
    paddingRight: '2.2%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }
  },
  cardItem: {
    minWidth: '100%',
    margin: '4px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: '4px',
      minWidth: '90%'
    }
  },
  card: {
    padding: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      padding: '2px',
      marginTop: '0'
    }
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    }
  },
  controls: {
    margin: '50px auto 10px auto',
    maxWidth: '200px',
    maxHeight: '50px',
    alignSelf: 'flex-end'
  },
  paper: {
    padding: '8px',
    margin: '8px',
    width: '100%',
    alignSelf: 'center'
  },
  colorized: {
    backgroundColor: 'rgb(232, 232, 232)'
  },
  currentWord: {
    width: '80%',
    margin: '0 auto'
  },
  currentPaper: {
    padding: '8px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      fontSize: 10
    }
  }
});

export {styles};
