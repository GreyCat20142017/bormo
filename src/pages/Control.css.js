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
    margin: '20px auto',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '60%',
    }
  },
  currentPaper: {
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },

  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 2%'
  },

  badge: {
    padding: `0 ${theme.spacing.unit}px`,
    textTransform: 'uppercase'
  },

});

export {styles};
