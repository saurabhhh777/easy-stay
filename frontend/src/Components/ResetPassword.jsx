import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/UserService";
import { toast } from "react-toastify";

const ResetPassword = () => {
  let { token } = useParams();
  let navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let resetPasswordRes = await resetPassword(data,token)
    if(resetPasswordRes.status === 200) {
        toast.success("Password Reset Successfully")
        navigate("/login")
    }
    else if(resetPasswordRes.status === 404) {
        toast.error("User with this token not found")
    }
    else {
        toast.error("Something went wrong")
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <h1 className="text-3xl font-semibold mb-5">Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="password"
          placeholder="New Password"
          className="px-3 py-2 bg-zinc-700 outline-none mr-4 w-[300px]"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        <button className="px-3 py-2 bg-blue-600 rounded-lg" type="submit">
          Reset
        </button>

        {errors.password && (
          <p className="text-red-500 mt-2">{errors.password.message}</p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
