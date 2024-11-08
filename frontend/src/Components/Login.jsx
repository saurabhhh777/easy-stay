import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/UserService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { isLoggedin } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isLoggedin) {
      return navigate("/home");
    }
    return navigate("/login");
  }, []);

  async function handleLoginSubmit(data) {
    let loginUserRes = await loginUser(data);
    if (loginUserRes.status === 200) {
      toast.success("Login Successfull");
      dispatch(setLoggedin(true));
      navigate("/home");
    } else if (loginUserRes.status === 404) {
      toast.error("You are not registered");
    } else if (loginUserRes.status === 401) {
      toast.error("Invalid Password");
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white p-10">
      <h1 className="text-3xl font-semibold mb-5">Login Your Account</h1>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="block px-3 py-2 bg-zinc-700 w-[400px] mt-2 mb-3 outline-none"
            type="email"
            placeholder="Email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            className="block px-3 py-2 bg-zinc-700 w-[400px] mt-2 mb-3 outline-none"
            type="password"
            placeholder="Password"
            name="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="px-3 py-2 bg-blue-600 rounded-lg">
          Login
        </button>
      </form>
      <Link className="text-blue-600" to={"/forgot-password"}>
        Forgot Password
      </Link>
      <span className="block mt-3">
        Don't have an account?{" "}
        <Link to={"/"} className="text-blue-600">
          Sign up
        </Link>
      </span>
    </div>
  );
};

export default Login;
