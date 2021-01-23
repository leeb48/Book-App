import { Link } from "@material-ui/core";
import { Link as ReactRouterLink } from "react-router-dom";
import React from "react";

interface Props {
  to: string;
  variant:
    | "inherit"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "srOnly"
    | undefined;
  color:
    | "inherit"
    | "initial"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error"
    | undefined;
  className?: string;
}

const RouterLink: React.FunctionComponent<Props> = ({
  to,
  variant,
  color,
  className,
  children,
}) => {
  return (
    <Link
      component={ReactRouterLink}
      to={to}
      variant={variant}
      color={color}
      className={className}
    >
      {children}
    </Link>
  );
};

export default RouterLink;
