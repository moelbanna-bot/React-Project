import React from "react";
import { Lang } from "../context/LangContext";

const LanguageDisplay = ({ text, status, lang }) => {
  return (
    <div
      style={{
        direction: Lang[lang]?.dir || "ltr",
        textAlign: Lang[lang]?.dir === "rtl" ? "right" : "left",
        minHeight: "2em",
        marginBottom: "1rem",
      }}
    >
      <h1>{status === "loading" ? "Loading..." : text}</h1>
    </div>
  );
};

export default LanguageDisplay;
