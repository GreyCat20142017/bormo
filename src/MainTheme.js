import {createMuiTheme} from '@material-ui/core/styles';
import {indigo, blueGrey, deepPurple, white, black, amber, orange, grey} from '@material-ui/core/colors';

const NeutralTheme = createMuiTheme({
  palette: {
    primary: {main: indigo[500], light: indigo[300], dark: indigo[900], contrastText: white},
    secondary: {main: blueGrey[200], dark: blueGrey[400], contrastText: black},
    error: {main: orange[900]},
  },
  typography: {
    useNextVariants: true,
  },
});

const BrightTheme = createMuiTheme({
  palette: {
    primary: {main: deepPurple[400], light: deepPurple[300], dark: deepPurple[900], contrastText: white},
    secondary: {main: orange[400], dark: orange[600], contrastText: black},
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
    secondary: {main: orange[400], dark: orange[600], contrastText: black},
    error: {main: orange[900]},
  },
  typography: {
    useNextVariants: true,
  },
});

const AmberTheme = createMuiTheme({
  palette: {
    primary: {main: amber[200], light: amber[50], dark: amber[800], contrastText: black},
    secondary: {main: grey[300], dark: grey[500], contrastText: black},
    error: {main: orange[900]},
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
