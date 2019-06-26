const styles = theme => ({
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
    margin: theme.spacing.unit,
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
  part: {
    width: '30%',
    textAlign: 'center',
    paddingLeft: '1%',
    paddingRight: '1%',
    [theme.breakpoints.down('md')]: {
      width: '90%',
      margin: 'auto'
    }
  },
  partDesktopOnly: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  parts: {
    display: 'flex',
    justifyContent: 'space-between',
    align: 'stretch'
  },
  currentWord: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50px'
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

  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    }
  }
});

export {styles};
