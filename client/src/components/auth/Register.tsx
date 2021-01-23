import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "utils/useForm";
import { RegisterUserDto } from "api/springApi";
import { useAppDispatch } from "app/store";
import { registerUser } from "features/userAuth/userSlice";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { clearInputErrors } from "features/alerts/alertsSlice";
import LoginLink from "./LoginLink";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFormValues: RegisterUserDto = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  password2: "",
};

export default function Register() {
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

  const { values, onChange } = useForm<RegisterUserDto>(initialFormValues);

  const { firstName, lastName, username, password, password2 } = values;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(registerUser(values));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={inputErrors.firstName ? true : false}
                helperText={inputErrors.firstName}
                autoComplete="fname"
                name="firstName"
                value={firstName}
                onChange={onChange}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={inputErrors.lastName ? true : false}
                helperText={inputErrors.lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={onChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  inputErrors.username || inputErrors.duplicateUsername
                    ? true
                    : false
                }
                helperText={
                  inputErrors.username || inputErrors.duplicateUsername
                }
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="username"
                value={username}
                onChange={onChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={inputErrors.password ? true : false}
                helperText={inputErrors.password}
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={inputErrors.password2 ? true : false}
                helperText={inputErrors.password2}
                variant="outlined"
                required
                fullWidth
                name="password2"
                value={password2}
                onChange={onChange}
                label="Repeat Password"
                type="password"
                id="password2"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <LoginLink>
                <Link variant="body2">Already have an account? Sign in</Link>
              </LoginLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Link component={RouterLink} to="/" variant="body2">
          Go To Landing
        </Link>
        <Copyright />
      </Box>
    </Container>
  );
}
