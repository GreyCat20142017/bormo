import {createMuiTheme} from '@material-ui/core/styles';
import {indigo, blueGrey, deepPurple, white, black, amber, orange, grey} from '@material-ui/core/colors';

const NeutralTheme = createMuiTheme({
  palette: {
    primary: {main: indigo[500], light: indigo[300], dark: indigo[900], contrastText: white},
    secondary: {main: blueGrey[200], dark: blueGrey[600], contrastText: black},
    error: {main: orange[900]},
  },
  typography: {
    useNextVariants: true,
  },
});

const BrightTheme = createMuiTheme({
  palette: {
    primary: {main: deepPurple[400], light: deepPurple[300], dark: deepPurple[900], contrastText: white},
    secondary: {main: grey[500], dark: grey[600], contrastText: black},
    error: {main: orange[900]},
  },
  typography: {
    useNextVariants: true,
  },
  props: {
    key: 'neutral'
  }
});

const GreyTheme = createMuiTheme({
  palette: {
    primary: {main: blueGrey[500], light: blueGrey[300], dark: blueGrey[900], contrastText: black},
    secondary: {main: grey[200], dark: grey[600], contrastText: black},
    error: {main: orange[900]},
  },
  typography: {
    useNextVariants: true,
  },
});

const AmberTheme = createMuiTheme({
  palette: {
    primary: {main: amber[200], light: amber[100], dark: amber[400], contrastText: grey[700]},
    secondary: {main: grey[500], dark: grey[500], contrastText: white},
    error: {main: amber[700]},
  },
  typography: {
    useNextVariants: true,
  },
});

const MainTheme = {
  neutral: {themeObject: NeutralTheme, themeDescription: 'Нейтральная тема', themeName: 'Обычная', themeKey: 'neutral'},
  bright: {themeObject: BrightTheme, themeDescription: 'Фиолетовый кошмар', themeName: 'Странная', themeKey: 'bright'},
  grey: {themeObject: GreyTheme, themeDescription: 'Серый апельсин', themeName: 'Серая', themeKey: 'grey'},
  amber: {themeObject: AmberTheme, themeDescription: 'Солнечный удар', themeName: 'Желтая', themeKey: 'amber'}
};

export default MainTheme;
