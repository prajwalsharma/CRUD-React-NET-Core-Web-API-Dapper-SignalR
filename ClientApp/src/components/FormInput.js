import React from "react";

const FormInput = ({ label, value, onchange }) => {
  return (
    <div className="form-group">
      <label>{label}: </label>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={(e) => onchange(e.target.value)}
      />
    </div>
  );
};

export default FormInput;
