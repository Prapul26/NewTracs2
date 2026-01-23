import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TestQuill() {
  const DEFAULT_TEXT = "<p>hello welcome</p>";

  const [editorValue, setEditorValue] = useState("");
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);

    if (isChecked) {
      setEditorValue(DEFAULT_TEXT);
    } else {
      setEditorValue("");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h2>React Quill with Checkbox</h2>

      <ReactQuill
        value={editorValue}
        onChange={setEditorValue}
        theme="snow"
        style={{ height: "200px", marginBottom: "20px" }}
      />

      <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        Insert "hello welcome"
      </label>
    </div>
  );
}

export default TestQuill;
