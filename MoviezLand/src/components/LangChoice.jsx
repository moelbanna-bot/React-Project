import React from "react";
import { Lang } from "../context/LangContext";

const LangChoice = ({ currentLang, onChange }) => (
  <select
    value={currentLang}
    onChange={(e) => onChange(e.target.value)}
    style={{ padding: "0.5rem", fontSize: "1rem" }}
  >
    {Object.entries(Lang).map(([code, { label }]) => (
      <option key={code} value={code}>
        {label}
      </option>
    ))}
  </select>
);

export default LangChoice;
