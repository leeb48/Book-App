// React Imports
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Utility & Redux Imports
import { loadJwt } from "utils/loadJwt";
import { useAppDispatch } from "./store";
import Oauth2LoginError from "components/errors/Oauth2LoginError";

// Component Imports
import BookSearchPage from "components/bookSearch/BookSearchPage";
import Navbar from "components/layout/Navbar";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Landing from "../components/layout/Landing";
import Bookshelf from "components/bookshelf/Bookshelf";
import { loadUser } from "features/userAuth";
import BookshelfViewBooks from "components/bookshelf/BookshelfViewBooks";
import { getUsersBookshelves } from "features/bookshelf";
import Alerts from "components/layout/Alerts";

const jwt = loadJwt();

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(loadUser());
    }
    dispatch(getUsersBookshelves());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Alerts />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/oauth2/login-error" component={Oauth2LoginError} />
        <Route exact path="/search" component={BookSearchPage} />
        <Route exact path="/bookshelf" component={Bookshelf} />
        <Route
          exact
          path="/bookshelf/:bookshelfName"
          component={BookshelfViewBooks}
        />
      </Switch>
    </Router>
  );
}

export default App;
