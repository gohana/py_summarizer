import '../App.css';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import muiTheme from '../theme';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EnterIcon from '@material-ui/icons/KeyboardReturn';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const fieldsHeight = '3rem';

const useStyles = makeStyles(() => ({
  homeDiv: {
    paddingTop: '3rem',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: '5%',
    marginLeft: '5%',
  },
  fieldsDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  textField: {
    fontFamily: muiTheme.palette.typography.fontFamily,
    width: '100%',
    padding: '0',
    marginRight: '1rem',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: muiTheme.palette.primary.main,
      },
      '&:hover fieldset': {
        borderColor: muiTheme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: muiTheme.palette.primary.main,
      },
      '&.Mui-disabled fieldset': {
        borderColor: muiTheme.palette.primary.main,
      },
    },
    '& .MuiInputBase-input': {
      fontColor: muiTheme.palette.primary.main,
      color: muiTheme.palette.primary.main,
    },
  },
  urlInput: {
    fontFamily: muiTheme.palette.typography.fontFamily,
    fontColor: muiTheme.palette.primary.main,
    color: muiTheme.palette.primary.main,
    height: fieldsHeight,
  },
  summaryInput: {
    fontFamily: muiTheme.palette.typography.fontFamily,
    padding: '0.8rem',
  },
  button: {
    fontFamily: muiTheme.palette.typography.fontFamily,
    color: muiTheme.palette.primary.main,
    textTransform: 'none',
    paddingBottom: 0,
    paddingTop: 0,
    height: fieldsHeight,
    borderColor: muiTheme.palette.primary.main,
    fontSize: '1rem',
  },
  summarizeIcon: {
    margin: 0,
    padding: 0,
  },
  sentencesButton: {
    marginRight: '1rem',
    fontSize: '1rem',
    fontFamily: muiTheme.palette.typography.fontFamily,
    color: muiTheme.palette.primary.main,
    textTransform: 'none',
    paddingBottom: 0,
    paddingTop: 0,
    height: fieldsHeight,
    borderColor: muiTheme.palette.primary.main,
    whiteSpace: 'nowrap',
  },
  sentencesLeftIcon: {
    marginLeft: '0.2rem',
    padding: 0,
    opacity: '100%',
  },
  sentencesRightIcon: {
    marginRight: '0.2rem',
    padding: 0,
    opacity: '100%',
  },
}));

// to check if URL is valid
// credit: https://www.geeksforgeeks.org/check-if-an-url-is-valid-or-not-using-regular-expression/
const regex = new RegExp(
  '((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]' +
    '{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)'
);

function Home() {
  const classes = useStyles();
  const [url, setUrl] = React.useState('');
  const [numSentences, setNumSentences] = React.useState(3);
  const [summary, setSummary] = React.useState('');

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleLessSentences = () => {
    if (numSentences > 0) {
      setNumSentences(numSentences - 1);
    }
  };

  const handleMoreSentences = () => {
    setNumSentences(numSentences + 1);
  };

  const handleSummary = () => {
    if (url.length === 0 || !regex.test(url)) {
      // reset
      setUrl('');
      setSummary('');
      return;
    }

    fetch('https://py-summarizer.wl.r.appspot.com/summarize', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({url, num_sentences: numSentences}),
    })
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.title + '\n\n\n' + data.summary);
      });
  };

  const summarizeButton = (
    <>
      <Hidden xsDown implementation="css">
        <Button
          className={classes.button}
          variant="outlined"
          onClick={handleSummary}
          startIcon={<EnterIcon className={classes.summarizeIcon} />}
        >
          Summarize
        </Button>
      </Hidden>
      <Hidden smUp implementation="css">
        <Button
          className={classes.button}
          variant="outlined"
          onClick={handleSummary}
        >
          <EnterIcon className={classes.summarizeIcon} />
        </Button>
      </Hidden>
    </>
  );

  return (
    <div className={classes.homeDiv}>
      <div className={classes.fieldsDiv}>
        <TextField
          placeholder="URL of article"
          className={classes.textField}
          InputProps={{
            className: classes.urlInput,
          }}
          variant="outlined"
          value={url}
          onChange={handleUrlChange}
        />
        <Button
          fullWidth
          className={classes.sentencesButton}
          variant="outlined"
          startIcon={
            <ArrowLeftIcon
              className={classes.sentencesLeftIcon}
              onClick={handleLessSentences}
            />
          }
          endIcon={
            <ArrowRightIcon
              className={classes.sentencesRightIcon}
              onClick={handleMoreSentences}
            />
          }
        >
          {numSentences} sentences
        </Button>
        {summarizeButton}
      </div>
      <div>
        <TextField
          placeholder="Summary of article"
          className={classes.textField}
          InputProps={{className: classes.summaryInput}}
          variant="outlined"
          multiline
          disabled
          value={summary}
        />
      </div>
    </div>
  );
}

export default Home;
