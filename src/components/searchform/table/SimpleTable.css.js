const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflow: 'auto',
  },
  table: {
    width: '100%',
    maxHeight: '300px',
    overflow: 'auto'
  },
  joinedPanel: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    border: '1px solid rgb(211,211,211)',
    display: 'flex'
  }
});

export {styles};
