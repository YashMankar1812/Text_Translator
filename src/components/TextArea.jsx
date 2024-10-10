import React from "react";

const TextArea = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Enter text to translate..."
        rows="4"
        className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default TextArea;
