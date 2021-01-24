import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core/styles';
import './App.css';

const muiTheme = createMuiTheme({
  palette: {
    background: {
      default: '#2d2d2d',
    },
    primary: {
      main: '#f0f0f0',
    },
    typography: {
      fontFamily: "'Tajawal', sans-serif",
    },
  },
});

export default muiTheme;
