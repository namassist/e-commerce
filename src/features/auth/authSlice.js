import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, redirect, isLogin, notFound }) => {
    try {
      if (isLogin) {
        return isLogin;
      }
      if (username === "admin@bukapedia.com" && password === "admin123") {
        redirect({ role: "isAdmin" });
        return { id: 99, role: "isAdmin", user: username, login: true };
      }

      const resPost = await axios.post("https://fakestoreapi.com/auth/login", {
        username: username !== "" ? username : " ",
        password: password !== "" ? password : " ",
      });

      const resGet = await axios.get("https://fakestoreapi.com/users");
      let find = resGet.data.find((res) => res.username === username);

      if (resPost.data.token) {
        redirect({ role: "user" });
        return {
          id: find.id,
          role: "user",
          user: `${find.name.firstname} ${find.name.lastname}`,
          token: resPost.data.token,
          login: true,
        };
      }
    } catch (error) {
      notFound(true);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    login: localStorage.getItem("login")
      ? JSON.parse(localStorage.getItem("login"))
      : [],
  },
  reducers: {
    clearLogin: (state) => {
      state.login = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.login = [];
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.login = action.payload;
        localStorage.setItem("login", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { clearLogin } = authSlice.actions;

export default authSlice.reducer;
