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
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
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
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center bg-blue-100 rounded-full p-3 mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3898/3898082.png"
              alt="logo"
              className="w-12 h-12"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Universal Translator
          </h1>
          <p className="text-gray-500 text-center">
            Break language barriers in real-time
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <LanguageSelector
              label="From"
              languages={languages}
              selected={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            />
            <TextArea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Type or paste text here..."
              autoFocus
            />
            <div className="text-xs text-gray-500 mt-1">
              {sourceText.length} characters
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <button
              onClick={swapLanguages}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors"
              aria-label="Swap languages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1">
            <LanguageSelector
              label="To"
              languages={languages}
              selected={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            />
            <TextArea
              value={translatedText}
              onChange={(e) => setTranslatedText(e.target.value)}
              placeholder="Translation will appear here..."
              readOnly={!translatedText}
            />
            {translatedText && (
              <div className="text-xs text-gray-500 mt-1">
                {translatedText.length} characters
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={handleTranslate}
          disabled={!sourceText.trim() || isTranslating}
          className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all ${
            !sourceText.trim() || isTranslating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
          }`}
        >
          {isTranslating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Translating...
            </span>
          ) : (
            "Translate"
          )}
        </button>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          Powered by RapidAPI Text Translator
        </div>
      </div>
    </div>
  );
};

export default App;