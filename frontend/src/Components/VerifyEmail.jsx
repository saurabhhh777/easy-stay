import React from "react";
import { useForm } from "react-hook-form";
import { verifyEmail } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setLoggedin } from "../redux/reducers/UserReducer";

const VerifyEmail = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleVerifyEmail(data) {
    let verifyEmailRes = await verifyEmail(data)
    if(verifyEmailRes.status === 200) {
      toast.success("Email Verified Successfully")
      dispatch(setLoggedin(true))
      navigate("/home")
    }
    else if(verifyEmailRes.status === 404) {
      toast.error("User not found")
    }
    else if(verifyEmailRes.status === 400) {
      toast.error("Invalid OTP")
    }
    else {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 p-10 text-white">
      <h1 className="text-3xl font-semibold mb-5">Verify Email</h1>
      <form onSubmit={handleSubmit(handleVerifyEmail)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="block mt-2 mb-3 px-3 py-2 bg-zinc-700 outline-none mr-4 w-[400px]"
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
          <label htmlFor="otp">OTP</label>
          <input
            className="block mt-2 mb-3 px-3 py-2 bg-zinc-700 outline-none mr-4 w-[400px]"
            type="number"
            placeholder="OTP"
            name="otp"
            {...register("otp", {
              required: "OTP is required",
              minLength: {
                value: 6,
                message: "OTP must be at least 6 digits",
              },
            })}
          />
          {errors.otp && (
            <p className="text-red-500">{errors.otp.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-5 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
