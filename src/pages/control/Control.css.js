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
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      margin: '4px',
      width: '90%'
    }
  },
  card: {
    padding: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      padding: '2px',
      marginTop: '0',
      height: '22px',
      width: '100%'
    }
  },
  title: {
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      overflow: 'hidden',
      maxWidth: '100%',
      maxHeight: '22px'
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
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      order: '3',
      height: '22px'
    }
  },
  currentWordContent: {
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontWeight: 'normal',
      fontSize: 14,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
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
    padding: '0 2%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },

  badge: {
    padding: `0 ${theme.spacing.unit}px`,
    textTransform: 'uppercase'
  },

});

export {styles};
