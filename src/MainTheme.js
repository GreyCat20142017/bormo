import {createMuiTheme} from '@material-ui/core/styles';
import {indigo, blueGrey, white, black, pink, orange, grey} from '@material-ui/core/colors';

export const MDB_COLOR = '#59698d';
export const PINK_COLOR = pink[100];
export const DARKPINK_COLOR = pink[800]

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
      main: grey[500],
      dark: grey[700],
      contrastText: black
    },
    error: {main: orange[900]},
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
  }
};

export default MainTheme;
