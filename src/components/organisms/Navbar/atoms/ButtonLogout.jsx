import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Atoms/Button";
import IconLogout from "../../../icons/IconLogout";

const ButtonLogout = () => {
  let navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/home");
  };

  return (
    <>
      <Button buttonDanger onClick={() => logOut()}>
        <div className="flex text-xs">
          <IconLogout />
          <p className="m-auto mx-2 text-xs">Logout</p>
        </div>
      </Button>
    </>
  );
};

export default ButtonLogout;
