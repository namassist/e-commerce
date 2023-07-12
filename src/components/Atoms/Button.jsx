import React from "react";
import propTypes from "prop-types";

const Button = (props) => {
  const className = ["button"];
  if (props.buttonPrimary) className.push("btn btn-primary text-white");
  if (props.buttonSecondary) className.push("btn badge badge-primary badge-outline");
  if (props.buttonDanger) className.push("btn btn-error text-white");
  if (props.isBig) className.push("btn-lg text-sm");
  if (props.isFullWidth) className.push("text-xs w-full");
  if (props.isSmall) className.push("btn-sm text-xs");
  return <button onClick={props.handleClick} className={className.join(" ")}>{props.children}</button>;
};

Button.propTypes = {
  buttonPrimary: propTypes.bool,
  buttonSecondary: propTypes.bool,
  buttonDanger: propTypes.bool,
  isBig: propTypes.bool,
  isFullWidth: propTypes.bool,
  isSmall: propTypes.bool,
};

export default Button;
