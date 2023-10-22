import React, { useState, useRef } from 'react';
import './CodeEditor.css';

function CodeEditor() {
  const [code, setCode] = useState(``);
  const [isLocked, setIsLocked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const codeEditorRef = useRef(null);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard');
      });
    } else {
      alert('No code to copy.');
    }
  };

  const handleSave = () => {
    if (code) {
      alert('Code saved');
    } else {
      alert('No code to save.');
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const handleFocus = () => {
    setIsFocused(true);
    const codeEditorElement = codeEditorRef.current;
    
    if (codeEditorElement) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(codeEditorElement);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };  

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`code-editor ${isFocused ? 'focused' : ''}`}>
      <div className="editor-toolbar">
        <div>
          <button className="button copy-button" onClick={handleCopy}>Copy</button>
          <button className="button save-button" onClick={handleSave}>Save</button>
        </div>
        <div>
          <button className="button lock-button" onClick={toggleLock}>
            {isLocked ? 'Unlock' : 'Lock'}
          </button>
        </div>
      </div>
      <div className="editor-content">
        <div className={`placeholder ${code && 'hidden'}`}>
          Start typing here.......
        </div>
        <pre
          ref={codeEditorRef}
          className={isLocked ? 'locked' : ''}
          contentEditable={!isLocked}
          onInput={(e) => setCode(e.target.innerText)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {code}
        </pre>
      </div>
    </div>
  );
}

export default CodeEditor;
