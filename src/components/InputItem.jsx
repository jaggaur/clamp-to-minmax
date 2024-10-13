import React from "react";

const InputItem = (props) => {
  const { displayText = "Display text", placeholder = "", defaultValue = "", unit = "PX", inputValue, onChange } = props;

  return (
    <div className="input-item">
      <p className="input-ttl">{displayText}</p>
      <div className="input-box">
        <input type="text" placeholder={placeholder} value={inputValue} onChange={onChange} />
        <span className="unit">{unit}</span>
      </div>
    </div>
  );
};

export default InputItem;
