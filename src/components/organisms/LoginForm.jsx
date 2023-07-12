import React, { useState } from "react";
// import axios from "axios";
import { getAllProducts } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Atoms/Button";
import loginpage from "../../assets/images/ilustration.png";
import { loginUser } from "../../features/auth/authSlice";

const LoginForm = () => {
  const { isLoading } = useSelector(getAllProducts);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
      setError(false);
      dispatch(loginUser({ username, password, redirect, notFound }));
    }
  };

  const redirect = (status) => {
    if (status.role === "isAdmin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const notFound = (status) => {
    setError(true);
    navigate("/login");
  };
  return (
    <section id="login">
      <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-20">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* <!-- left side --> */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">Welcome back</span>
            <span className="font-light text-gray-400 mb-8">
              Don’t have a account, Sign up
            </span>
            <form className="card-body" onSubmit={handleLogin}>
              <div className="py-14">
                <div className="py-4">
                  <span className="mb-2 text-md">Username</span>
                  <input
                    value={username}
                    onChange={handleUsername}
                    type={"text"}
                    name="username"
                    className="input input-bordered"
                    placeholder="mor_2314"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="py-4">
                  <span className="mb-2 text-md">Password</span>
                  <input
                    value={password}
                    onChange={handlePassword}
                    type={"password"}
                    name="password"
                    className="input input-bordered"
                    placeholder="83r5^_"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="w-full py-4 text-red-500 italic capitalize tracking-wide text-base">
                  {empty && <p>Please fill in the login form first</p>}
                </div>
                <div className="w-full py-4 text-red-500 italic capitalize tracking-wide text-base">
                  {error && (
                    <p>The username or password you entered is incorrect</p>
                  )}
                </div>
                <div className="flex justify-between w-full py-4">
                  <div className="mr-24">
                    <input type="checkbox" name="ch" id="ch" className="mr-2" />
                    <span className="text-md">Remember me</span>
                  </div>
                  <span
                    className="font-bold text-md "
                    style={{ color: "#3D85C6" }}
                  >
                    Forgot password
                  </span>
                </div>
                {isLoading && <h1>loading...</h1>}
              </div>
              <Button type={"submit"} buttonPrimary isFullWidth>
                Login
              </Button>
            </form>
          </div>

          {/* <!-- right side --> */}
          <div className="relative">
            <img
              className="py-8 "
              src={loginpage}
              alt="img"
              width={675.54}
              height={454.17}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
