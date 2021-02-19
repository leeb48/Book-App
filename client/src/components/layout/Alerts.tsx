import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alerts = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { alerts } = useSelector((state: RootState) => {
    return {
      alerts: state.alerts.alerts,
    };
  }, shallowEqual);

  useEffect(() => {
    if (alerts.length > 0) {
      setOpen(true);
    }
  }, [alerts]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const alertType =
    alerts.length > 0 ? alerts[alerts.length - 1].alertType : undefined;

  const alertMessage =
    alerts.length > 0 ? alerts[alerts.length - 1].message : undefined;

  return (
    <div className={classes.root}>
      {alerts.length > 0 && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alertType}>
            {alertMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Alerts;
