const styles = theme => ({
  mainWrapper: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    padding: '1%',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '200px'
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: '400px'
    }
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  }
});

export {styles};
