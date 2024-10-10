import React, { useState } from "react";
import LanguageSelector from "./components/LanguageSelector";
import TextArea from "./components/TextArea";
import "./App.css";
import axios from "axios";

const App = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("hi");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
  ];

  const handleTranslate = async () => {
    try {
      const options = {
        method: "POST",
        url: "https://text-translator2.p.rapidapi.com/translate",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": `a3da6f56fcmshd6949dac44154d8p1ed70ejsn118b48e1b378`,
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        data: new URLSearchParams({
          source_language: sourceLanguage,
          target_language: targetLanguage,
          text: sourceText,
        }),
      };

      const response = await axios.request(options);
      setTranslatedText(response.data.data.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-[#37a18d]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-[70vw] w-full">
        <div className="">
          <img
            src="https://cdn-icons-png.freepik.com/512/179/179413.png"
            alt="logo"
            className="w-10 h-10"
          />
          <h1 className="text-3xl font-bold text-[#6f498b] text-center mb-6">
            Universal Translator
          </h1>
        </div>
        <div className="flex justify-between gap-8">
          <div className="w-1/2">
            <LanguageSelector
              label="Source Language"
              languages={languages}
              selected={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            />
            <TextArea
              label="Enter Text"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <LanguageSelector
              label="Target Language"
              languages={languages}
              selected={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            />
            {translatedText && (
              <TextArea
                label="Translated Text"
                value={translatedText}
                onChange={(e) => setTranslatedText(e.target.value)}
              />
            )}
          </div>
        </div>
        <button
          onClick={handleTranslate}
          className="bg-[#37a18d] text-white py-2 px-4 rounded-lg hover:bg-[#2b7e6f] w-full transition-transform transform hover:scale-105 active:scale-100"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default App;
