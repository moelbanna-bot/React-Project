import React from "react";
import { BrowserRouter } from "react-router-dom";
import CardDetails from "./components/CardDetails";
import LanguageDisplay from "./components/LanguageDisplay";
import LangChoice from "./components/LangChoice"; 
import { useTranslation } from "./context/LangContext";
import "./App.css";

const App = () => {
  const { lang, text, status, updateLanguage } = useTranslation("en");

  return (
    <div className="App">
      <BrowserRouter>
        <CardDetails />
        <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem", textAlign: "center" }}>
          <h2>Language Selector</h2>
          <LangChoice currentLang={lang} onChange={updateLanguage} />
          <LanguageDisplay text={text} status={status} lang={lang} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
