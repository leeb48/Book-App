// React Imports
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Utility & Redux Imports
import { loadJwt } from "utils/loadJwt";
import { loadUser } from "features/userAuth/userSlice";
import { useAppDispatch } from "./store";
import Oauth2LoginError from "components/errors/Oauth2LoginError";

// Component Imports
import BookSearchPage from "components/bookSearch/BookSearchPage";
import Navbar from "components/layout/Navbar";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Landing from "../components/layout/Landing";

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
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/oauth2/login-error" component={Oauth2LoginError} />
        <Route exact path="/search" component={BookSearchPage} />
      </Switch>
    </Router>
  );
}

export default App;
