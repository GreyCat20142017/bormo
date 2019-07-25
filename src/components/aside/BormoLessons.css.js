const styles = theme => ({
  root: {
    width: '100%',
  },
  fab: {
    margin: theme.spacing.unit,
    marginRight: 'auto',
    marginLeft: 'auto',
    fontSize: '80%',
    textTransform: 'none',
    flexShrink: 1
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  details: {
    alignItems: 'center',
    padding: '20px',
    overflowX: 'hidden',
    textAlign: 'center'
  },
  btn: {
    textTransform: 'none',
    padding: '0',
    margin: '0 auto',
    textAlign: 'center',
    flexShrink: 1
  },
  lessonList: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
    padding: '10px',
    listStyle: 'none'
  },
  expanded: {
    display: 'flex'
  },
  collapsed: {
    display: 'none'
  },
  message: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    textAlign: 'center'
  },
  actions: {
    padding: '4px'
  }
});

export {styles};
