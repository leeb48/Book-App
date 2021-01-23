import { useAppDispatch } from "app/store";
import { logoutSuccess } from "features/userAuth/userSlice";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const LogoutLink: React.FunctionComponent = ({ children }) => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(logoutSuccess());
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
