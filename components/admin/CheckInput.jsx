import React from "react";

const CheckInput = ({
  formik,
  name,
  value,
  setCheck,
  check,
  checkName,
  title,
}) => {
  return (
    <div className="mt-4 form-control w-full">
      <label className="label">
        <span className="label-text text-base-content">{title}</span>
      </label>

      <div className="flex items-center">
        <input
          type="checkbox"
          value={check}
          name={checkName}
          onChange={formik.handleChange}
        />
        <input
          type={"text"}
          placeholder={title}
          className="input input-primary input-bordered w-full ml-2"
          onChange={formik.handleChange}
          value={value}
          disabled={!check}
          id={name}
          name={name}
        />
      </div>
    </div>
  );
};

export default CheckInput;
