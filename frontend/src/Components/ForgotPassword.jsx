import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../services/UserService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [resetUrl, setresetUrl] = useState("");
  const [resettoken, setresettoken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let forgotPasswordRes = await forgotPassword(data);
    if (forgotPasswordRes.status === 200) {
      setresetUrl(forgotPasswordRes.data.resetUrl);
      setresettoken(forgotPasswordRes.data.resettoken);
    } else if (forgotPasswordRes.status === 404) {
      toast.error("User not found with this email");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      {resetUrl === "" ? (
        <>
          <h1 className="text-3xl font-semibold mb-5">Enter Your Email</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="px-3 py-2 w-[400px] bg-zinc-700 outline-none mr-4"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            <button type="submit" className="px-3 py-2 bg-blue-600 rounded-lg">
              Get Link
            </button>

            {errors.email && (
              <p className="text-red-500 mt-2">{errors.email.message}</p>
            )}
          </form>
          <Link to={'/login'} className="text-blue-600 block mt-3">Go back to Login</Link>
        </>
      ) : (
        <>
          <span>
            Go to this link to reset your password:
            <Link className="text-blue-600 ml-3" to={`/reset-password/${resettoken}`}>{resetUrl}</Link>
          </span>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
