import { createMuiTheme } from '@material-ui/core/styles';
import { indigo, blueGrey, red } from '@material-ui/core/colors';

const MainTheme = createMuiTheme({
  palette: {
    primary: {main: indigo[500], light: indigo[300], dark: indigo[800], contrastText: blueGrey[50]},
    secondary: {main: blueGrey[200],  dark: blueGrey[400], contrastText: indigo[800] },
    error: { main: red[500] },
  },
   typography: {
    useNextVariants: true,
  },
});

export default MainTheme;
