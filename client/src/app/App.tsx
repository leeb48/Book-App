import Oauth2LoginError from "components/errors/Oauth2LoginError";
import Navbar from "components/layout/Navbar";
import { loadUser } from "features/userAuth/userSlice";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadJwt } from "utils/loadJwt";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Landing from "../components/layout/Landing";
import { useAppDispatch } from "./store";

const jwt = loadJwt();

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/oauth2/login-error" component={Oauth2LoginError} />
      </Switch>
    </Router>
  );
}

export default App;
