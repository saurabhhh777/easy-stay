import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/UserService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
    let navigate = useNavigate()
    let { isLoggedin } = useSelector(state => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if(isLoggedin) {
      return navigate("/home")
    }
    return navigate("/")
  },[])
  
  async function handleRegisterSubmit(registerData) {
    let registerUserRes = await registerUser(registerData)
    if(registerUserRes.status === 201) {
        toast.success("Check Your Email For Verification")
        navigate("/verify-email")
    }
    else if(registerUserRes.status === 409) {
        toast.error("You are already registered")
    }
    else {
        toast.error("Something went wrong")
    }
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white p-10">
      <h1 className="text-3xl font-semibold mb-5">Create Your Account</h1>
      <form onSubmit={handleSubmit(handleRegisterSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="px-3 py-2 w-[400px] bg-zinc-700 outline-none mr-4 block mt-2 mb-3"
            type="text"
            placeholder="Name"
            name="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="px-3 py-2 w-[400px] bg-zinc-700 outline-none mr-4 block mt-2 mb-3"
            type="email"
            placeholder="Email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
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
            className="px-3 py-2 w-[400px] bg-zinc-700 outline-none mr-4 block mt-2 mb-3"
            type="password"
            placeholder="Password"
            name="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="px-3 py-2 bg-blue-600 rounded-lg">
          Create
        </button>
      </form>
      <span className="block mt-3">Already have an account? <Link to={'/login'} className="text-blue-600">Login</Link></span>
    </div>
  );
};

export default Register;
