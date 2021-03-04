import {
  AppBar,
  Button,
  IconButton,
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
import GitHubIcon from "@material-ui/icons/GitHub";

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
          <RouterLink variant="h5" to="/" color="textPrimary">
            The Book Keeper
          </RouterLink>
          <IconButton
            onClick={() => window.open("https://github.com/leeb48/Book-App")}
          >
            <GitHubIcon style={{ width: 35, height: 35 }} color="primary" />
          </IconButton>
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
            to="/search"
            variant="button"
            color="textPrimary"
            className={classes.link}
          >
            Search For Books
          </RouterLink>
          <RouterLink
            to="/bookshelf"
            variant="button"
            color="textPrimary"
            className={classes.link}
          >
            My Bookshelf
          </RouterLink>
        </nav>
        {isAuthenticated ? authenticatedLinks : notAuthenticatedLinks}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
