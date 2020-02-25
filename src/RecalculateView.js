import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import {makeStyles, Container} from '@material-ui/core';

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
    float: "none",
  },
  col: {
    margin: 10,
    flex: "50%",
    alignContent: "center",
    textAlign: "center",
    float: "none",
  }
}));

function handleClick() {

}

function RecalculateView({isQuerying, setIsQuerying}) {
    const classes = useStyles();

    const [progress, setProgress] = React.useState(false);
    const handleClick = () => {
      setProgress(true);
      setIsQuerying(true);
    };

    return (
      <div class={classes.buttonContainer}>
        <div className={classes.placeholder}>
        <Fade
          in={!progress}
          style={{
            transitionDelay: progress ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <Button variant="contained" onClick={handleClick}>Run Model</Button>
        </Fade>
          <Fade
            in={progress}
            style={{
              transitionDelay: progress ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <div class={classes.row}>
              <div class={classes.col}>
                <CircularProgress />
              </div>
              <div class={classes.col}>
                <h5>Running Model...</h5>
              </div>
            </div>       
          </Fade>
        </div>
      </div>
    );
}
  
export default RecalculateView;