import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import { makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    width: "100%",
    display: "flex",
    padding: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  row: {
    display: "flex",
    alignContent: "center",
    textAlign: "center",
    position: "relative",
    float: "none",
  },
  col: {
    height: "100%",
    flex: "50%",
    alignContent: "center",
    textAlign: "center",
    float: "none",
    display: "inline-block",
  }
}));

function handleClick() {

}

function RecalculateView({ isQuerying, setIsQuerying }) {
  const classes = useStyles();

  const handleClick = () => {
    setIsQuerying(true);
  };

  return (
    <div class={classes.buttonContainer}>
      <div className={classes.placeholder}>
        <Fade
          in={!isQuerying}
          style={{
            transitionDelay: isQuerying ? '1ms' : '0ms',
          }}
          unmountOnExit
        >
          <Button variant="contained" onClick={handleClick}>Run Model</Button>
        </Fade>
        <Fade
          in={isQuerying}
          style={{
            transitionDelay: isQuerying ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <div className={classes.row}>
            <div className={classes.col}>
              <CircularProgress />
            </div>
            <div className={classes.col}>
              <h5>Running Model...</h5>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default RecalculateView;