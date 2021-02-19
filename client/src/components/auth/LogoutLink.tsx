import { useAppDispatch } from "app/store";
import { logoutUser } from "features/userAuth";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const LogoutLink: React.FunctionComponent = ({ children }) => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(logoutUser());
  };

  return (
    <Fragment>
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          component: Link,
          to: "/",
          onClick,
        });
      })}
    </Fragment>
  );
};

export default LogoutLink;
