import {
  AppBar,
  Button,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { RootState } from "app/rootReducer";
import LoginLink from "components/auth/LoginLink";
import LogoutLink from "components/auth/LogoutLink";
import RegisterLink from "components/auth/RegisterLink";
import RouterLink from "components/routing/RouterLink";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const { isAuthenticated, userInfo } = useSelector(
    (state: RootState) => state.user
  );

  const authenticatedLinks = (
    <Fragment>
      <Typography>Logged In as {userInfo?.username}</Typography>
      <LogoutLink>
        <Button color="secondary" variant="outlined" className={classes.link}>
          Logout
        </Button>
      </LogoutLink>
    </Fragment>
  );

  const notAuthenticatedLinks = (
    <Fragment>
      <LoginLink>
        <Button color="primary" variant="outlined" className={classes.link}>
          Login
        </Button>
      </LoginLink>
      <RegisterLink>
        <Button color="primary" variant="outlined" className={classes.link}>
          Register
        </Button>
      </RegisterLink>
    </Fragment>
  );

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Company name
        </Typography>
        <nav>
          <RouterLink
            to="/"
            variant="button"
            color="textPrimary"
            className={classes.link}
          >
            Home
          </RouterLink>
          <RouterLink
            to="/enterprice"
            variant="button"
            color="textPrimary"
            className={classes.link}
          >
            Enterprise
          </RouterLink>
          <RouterLink
            to="/support"
            variant="button"
            color="textPrimary"
            className={classes.link}
          >
            Support
          </RouterLink>
        </nav>
        {isAuthenticated ? authenticatedLinks : notAuthenticatedLinks}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
