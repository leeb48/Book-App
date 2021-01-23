import { useAppDispatch } from "app/store";
import { clearInputErrors } from "features/alerts/alertsSlice";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const LoginLink: React.FunctionComponent = ({ children }) => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(clearInputErrors());
  };

  return (
    <Fragment>
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          component: Link,
          to: "/login",
          onClick,
        });
      })}
    </Fragment>
  );
};

export default LoginLink;
