import React from "react";

const LanguageSelector = ({ label, languages, selected, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{label}</label>
      <select
        value={selected}
        onChange={onChange}
        className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
