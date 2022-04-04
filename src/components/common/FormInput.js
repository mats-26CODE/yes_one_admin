import React from "react";
import "./css/FormInput.css";

const FormInput = ({
  type,
  placeholder,
  maxLength,
  value,
  onChange,
  onClick,
  buttonType,
  buttonText,
}) => {
  return (
    <div className={"form__input_container"}>
      <form type="submit">
        <input
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
        />

        <button type={buttonType} onClick={onClick}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default FormInput;
