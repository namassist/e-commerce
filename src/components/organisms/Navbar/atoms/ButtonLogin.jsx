import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../Atoms/Button";
import IconLogin from "../../../icons/IconLogin";

const ButtonLogin = () => {
  return (
    <>
      <Button buttonPrimary>
        <Link to="/login">
          <div className="flex text-xs">
            <IconLogin />
            <p className="m-auto mx-2 text-xs">Login</p>
          </div>
        </Link>
      </Button>
    </>
  );
};

export default ButtonLogin;
