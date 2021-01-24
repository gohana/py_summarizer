import '../App.css';
import {makeStyles} from '@material-ui/core/styles';
import muiTheme from '../theme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(() => ({
  appbar: {
    display: 'flex',
    background: 'transparent',
  },
  title: {
    fontFamily: muiTheme.palette.typography.fontFamily,
    color: muiTheme.palette.primary.main,
    fontSize: '2rem',
    flexGrow: 1,
  },
  iconButton: {
    color: muiTheme.palette.primary.main,
    padding: 0,
  },
}));

function NavBar() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appbar} elevation={0} position="static">
      <Toolbar>
        <Typography className={classes.title}>Py Summarizer</Typography>
        <Tooltip title="GitHub">
          <IconButton
            className={classes.iconButton}
            color="inherit"
            href="//github.com/gohana/py_summarizer"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
