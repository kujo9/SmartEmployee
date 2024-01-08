"use client";
import React from "react";

const Button = ({
  title,
  isDisabled,
  handleClick,
  containerStyles,
  textStyles,
  btnType,
}) => {
  return (
    <div>
      <button
        type={btnType || "button"}
        disabled={isDisabled}
        onClick={handleClick}
        className={`custom-btn ${containerStyles}`}
      >
        <span className={`flex-1 ${textStyles}`}> {title}</span>
      </button>
    </div>
  );
};

export default Button;
