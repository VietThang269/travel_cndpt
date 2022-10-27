import axios from "axios";
import { apiUrl } from "../../constant";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./AuthAction";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${apiUrl}/signin`, user);
    console.log("res", res);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log("err", err);
    dispatch(loginFailure());
  }
};

export const register = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(`${apiUrl}/signup`, user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const logOut = async (dispatch) => {
  dispatch(logout());
  localStorage.removeItem("user");
};
