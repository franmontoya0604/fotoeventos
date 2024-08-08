import React from "react";
import slug from "slug";

const Input = ({
  formik,
  name,
  value,
  type,
  textArea,
  title,
  errors,
  touched,
  slugTouched
}) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text text-base-content">{title}:</span>
      </label>
      {textArea ? (
        <textarea
          type={type ? type : "text"}
          className="textarea textarea-bordered h-24"
          onChange={formik.handleChange}
          value={value}
          id={name}
          name={name}
        />
      ) : (
        <input
          type={type ? type : "text"}
          placeholder={title}
          className="input input-primary input-bordered w-full"
          onChange={(e) => {
            if(!slugTouched){
              formik.setFieldValue(
                "slug",
                slug(e.target.value, {
                  remove: /[`~!@#$%^&*()\+=\[\]{};:'"\\|\/,.<>?]/g,
                  replacement: "-",
                  lower: true,
                })
              );
            }
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={value}
          id={name}
          name={name}
        />
      )}
      {errors && touched && (
        <span className="error mt-1 text-red-600 text-xs">{errors}</span>
      )}
    </div>
  );
};

export default Input;
