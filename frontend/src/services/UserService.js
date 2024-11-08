import api from "../api";

export const registerUser = async function (registerData) {
  try {
    let registerUserRes = await api.post("/users/register", registerData, {
      withCredentials: true,
    });
    return registerUserRes;
  } catch (error) {
    return error;
  }
};

export const verifyEmail = async function (verifyData) {
  try {
    let verifyEmailRes = await api.post("/users/verify-email", verifyData, {
      withCredentials: true,
    });
    return verifyEmailRes;
  } catch (error) {
    return error;
  }
};

export const loginUser = async function (loginData) {
  try {
    let loginUserRes = await api.post("/users/login", loginData, {
      withCredentials: true,
    });
    return loginUserRes;
  } catch (error) {
    return error;
  }
};

export const logoutUser = async function () {
  try {
    let logoutUserRes = await api.get("/users/logout", {
      withCredentials: true,
    });
    return logoutUserRes;
  } catch (error) {
    return error;
  }
};

export const getLoggedinUser = async function () {
  try {
    let getLoggedinUserRes = await api.get("/users/profile", {
      withCredentials: true,
    });
    return getLoggedinUserRes;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async function (data) {
  try {
    let forgotPasswordRes = await api.post("/users/forgot-password", data, {
      withCredentials: true,
    });
    return forgotPasswordRes;
  } catch (error) {
    return error;
  }
};

export const resetPassword = async function (data, token) {
  try {
    let resetPasswordRes = await api.post(
      `/users/reset-password/${token}`,
      data,
      { withCredentials: true }
    );
    return resetPasswordRes;
  } catch (error) {
    return error;
  }
};
