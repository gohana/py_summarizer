import './App.css';
import {makeStyles} from '@material-ui/core/styles';
import muiTheme from './theme';
import NavBar from './components/NavBar';
import Home from './views/Home';

const useStyles = makeStyles(() => ({
  div: {
    backgroundColor: muiTheme.palette.background.default,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
