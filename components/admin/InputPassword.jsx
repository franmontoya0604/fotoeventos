import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

const InputPassword = ({ formik, name, value, title, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative mt-4 form-control w-full">
      <label className="label">
        <span className="label-text text-base-content">{title}</span>
      </label>
      <label className="flex justify-end items-center">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={title}
          className="input input-primary input-bordered w-full"
          onChange={formik.handleChange}
          value={value}
          id={name}
          name={name}
        />
        <div
          className="cursor-pointer absolute mr-1.5"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </div>
      </label>

      {errors ? (
        <span className="error mt-1 text-red-600 text-xs">{errors}</span>
      ) : null}
    </div>
  );
};

export default InputPassword;
