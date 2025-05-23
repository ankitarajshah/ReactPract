import React, { useState } from "react";

const ChipsInput = () => {
  const [inputText, setInputText] = useState("");
  const [chips, setChips] = useState(["a"]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmed = inputText.trim();
      if (trimmed && !chips.includes(trimmed)) {
        setChips((prev) => [...prev, trimmed]);
        setInputText("");
      }
      e.preventDefault(); // Optional: prevent form submission if inside a form
    }
  };

  //   const handleRemove = (indexToRemove) => {
  //     setChips((prev) => prev.filter((_, i) => i !== indexToRemove));
  //   };
  const handleRemove = (indexToRemove) => {
    const copyChips = [...chips];
    copyChips.splice(indexToRemove  , 1);
    setChips(copyChips);
  };

  return (
    <>
      <h1>ChipsInput</h1>
      <input
        type="text"
        placeholder="Type and press Enter"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
        {chips.map((chip, index) => (
          <div
            key={index}
            style={{
              background: "#555",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "16px",
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {chip}
            <button
              onClick={() => handleRemove(index)}
              style={{
                marginLeft: "8px",
                background: "none",
                border: "none",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChipsInput;
