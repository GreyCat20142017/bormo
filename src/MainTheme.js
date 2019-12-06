import {createMuiTheme} from '@material-ui/core/styles';
import {indigo, blueGrey, white, black, pink, amber, orange, deepOrange, grey} from '@material-ui/core/colors';

export const MDB_COLOR = '#59698d';

const NeutralTheme = createMuiTheme({
  palette: {
    primary: {
      main: MDB_COLOR
    },
    secondary: {
      main: blueGrey[200],
    },
    error: {main: pink[500]},
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    useNextVariants: true,
  },
});

const ClassicTheme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: indigo[300],
      dark: indigo[900],
      contrastText: white
    },
    secondary: {
      main: blueGrey[200],
      dark: blueGrey[600],
      contrastText: black
    },
    error: {main: orange[900]},
  },
  typography: {
    useNextVariants: true,
  },
});

const GreyTheme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[500],
      light: blueGrey[300],
      dark: blueGrey[900],
      contrastText: black
    },
    secondary: {
      main: grey[200],
      dark: grey[600],
      contrastText: black
    },
    error: {main: orange[900]},
  },
  typography: {
    useNextVariants: true,
  },
});

const AmberTheme = createMuiTheme({
  palette: {
    primary: {
      main: amber[400]
    },
    secondary: {
      main: blueGrey[400],
    },
    error: deepOrange,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    useNextVariants: true,
  },
});

const MainTheme = {
  neutral: {
    themeObject: NeutralTheme,
    themeDescription: 'Нейтральная тема',
    themeName: 'Нейтральная',
    themeKey: 'neutral'
  },
  classic: {
    themeObject: ClassicTheme,
    themeDescription: 'Обычная тема',
    themeName: 'Обычная',
    themeKey: 'classic'
  },
  grey: {
    themeObject: GreyTheme,
    themeDescription: 'Серый апельсин',
    themeName: 'Серая',
    themeKey: 'grey'
  },
  amber: {
    themeObject: AmberTheme,
    themeDescription: 'Солнечный удар',
    themeName: 'Желтая',
    themeKey: 'amber'
  }
};

export default MainTheme;
