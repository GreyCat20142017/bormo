import { createMuiTheme } from '@material-ui/core/styles';
import { indigo, blueGrey, red } from '@material-ui/core/colors';

const MainTheme = createMuiTheme({
  palette: {
    primary: {main: indigo[600], light: indigo[100], dark: indigo[800], contrastText: blueGrey[50]},
    secondary: { main: blueGrey[100],  contrastText: indigo[800] },
    error: { main: red[500] },
  },
   typography: {
    useNextVariants: true,
  },
});

export default MainTheme;