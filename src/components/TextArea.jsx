import React from "react";

const TextArea = ({ value, onChange, placeholder, readOnly, autoFocus }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      autoFocus={autoFocus}
      rows="6"
      className={`w-full px-3 py-2 border ${
        readOnly ? "bg-gray-50" : "bg-white"
      } border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800`}
    />
  );
};

export default TextArea;