import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { LoginUserDto } from "api/springApi";
import { useAppDispatch } from "app/store";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { useForm } from "utils/useForm";
import { loginUser } from "features/userAuth/userSlice";
import { clearInputErrors } from "features/alerts/alertsSlice";
import RegisterLink from "./RegisterLink";
import GitHubIcon from "@material-ui/icons/GitHub";

import { githubLoginUrl, googleLoginUrl } from "config/oauth2LoginUrls";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFormValues: LoginUserDto = {
  username: "",
  password: "",
};

export default function Login() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { inputErrors, isAuthenticated } = useSelector((state: RootState) => {
    return {
      inputErrors: state.alerts.inputErrors,
      isAuthenticated: state.user.isAuthenticated,
    };
  }, shallowEqual);

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    dispatch(clearInputErrors);
  }, [dispatch, history, isAuthenticated]);

  const { values, onChange } = useForm<LoginUserDto>(initialFormValues);

  const { username, password } = values;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginUser(values));
  };

  console.log(githubLoginUrl);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <TextField
            error={inputErrors.username ? true : false}
            helperText={inputErrors.username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="username"
            value={username}
            onChange={onChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={inputErrors.password ? true : false}
            helperText={inputErrors.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            onChange={onChange}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Button
            href={githubLoginUrl}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<GitHubIcon />}
          >
            Sign in with GitHub
          </Button>

          <Button
            href={googleLoginUrl}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in with Google
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <RegisterLink>
                <Link variant="body2">{"Don't have an account? Sign Up"}</Link>
              </RegisterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Link component={RouterLink} to="/" variant="body2">
          Go To Landing
        </Link>
        <Copyright />
      </Box>
    </Container>
  );
}
