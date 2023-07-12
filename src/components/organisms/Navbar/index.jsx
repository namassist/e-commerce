import React from "react";
import { Logo } from "../../Atoms/Logo";
import { useSelector, useDispatch } from "react-redux";
import { getAllCarts } from "../../../features/products/productSlice";
import { clearLogin } from "../../../features/auth/authSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Button from "../../Atoms/Button";
import IconLogin from "../../icons/IconLogin";
import IconLogout from "../../icons/IconLogout";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.auth.login);

  const totalQty = useSelector((state) => {
    const carts = useSelector(getAllCarts);
    return carts.reduce((total, item) => total + item.qty, 0);
  });

  let activeStyle = {
    color: "#000000",
    fontWeight: "bold",
    backgroundColor: "#fff",
    borderRadius: "10%",
  };

  const logOut = () => {
    dispatch(clearLogin());
    localStorage.removeItem("login");
    navigate("/home");
  };

  return (
    <div id="navbar" className="navbar bg-base-100 fixed mt-0 top-0">
      <div className="flex-1 ml-11">
        <NavLink as={Link} to={"/"}>
          <Logo />
        </NavLink>
      </div>
      <div className="mr-12">
        <ul tabIndex={0} className="menu menu-horizontal flex-1">
          {login.role !== "isAdmin" && (
            <li className="mr-5">
              <NavLink
                as={Link}
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="text-base py-2 mx-6 font-quicksand font-semibold group-hover:text-secondary"
              >
                Home
              </NavLink>
            </li>
          )}
          {login.role === "isAdmin" && (
            <>
              <li className="mr-5">
                <NavLink
                  as={Link}
                  to="/admin"
                  onClick={() => window.scrollTo(0, 0)}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className="text-base py-2 mx-6 font-quicksand font-semibold group-hover:text-secondary"
                >
                  Update
                </NavLink>
              </li>
              <li>
                <NavLink
                  as={Link}
                  to="/admin/sales-recap"
                  onClick={() => window.scrollTo(0, 0)}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className="text-base py-2 mx-6 font-quicksand font-semibold group-hover:text-secondary"
                >
                  Sales Recap
                </NavLink>
              </li>
            </>
          )}
          {login.role === "user" && (
            <li className="mr-5">
              <NavLink
                as={Link}
                to="/cart"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Cart
                <div className="absolute top-1 right-1 text-xs rounded-full bg-red-500 text-white px-1">
                  {totalQty}
                </div>
              </NavLink>
            </li>
          )}
          {login.role !== "isAdmin" && (
            <li className="mr-5">
              <NavLink
                as={Link}
                to="/#contact"
                onClick={() => window.scrollTo(0, 3000)}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="text-base py-2 mx-6 font-quicksand font-semibold group-hover:text-secondary"
              >
                Contact
              </NavLink>
            </li>
          )}
        </ul>
        <ul className="flex-none">
          {login.login ? (
            <li onClick={() => logOut()}>
              <Button buttonDanger>
                <div className="flex text-xs">
                  <IconLogout />
                  <p className="m-auto mx-2 text-xs">Logout</p>
                </div>
              </Button>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <Button buttonPrimary>
                  <div className="flex text-xs">
                    <IconLogin />
                    <p className="m-auto mx-2 text-xs">Login</p>
                  </div>
                </Button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
