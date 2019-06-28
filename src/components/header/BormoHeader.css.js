const styles = (theme) => ({
  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  menu: {
    marginLeft: 'auto',
    justifyContent: 'space-between'
  },
  switchable: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
});

export {styles};
