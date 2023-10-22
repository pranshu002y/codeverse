import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [htmlCode, setHtmlCode] = useState(localStorage.getItem('html_code') || '');
  const [cssCode, setCssCode] = useState(localStorage.getItem('css_code') || '');
  const [jsCode, setJsCode] = useState(localStorage.getItem('js_code') || '');
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Store data in Local Storage
    localStorage.setItem('html_code', htmlCode);
    localStorage.setItem('css_code', cssCode);
    localStorage.setItem('js_code', jsCode);
  }, [htmlCode, cssCode, jsCode]);

  const handleCopyClick = () => {
    const code = `<style>${cssCode}</style>${htmlCode}<script>${jsCode}</script>`;
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard');
    }).catch((error) => {
      console.error('Copy failed:', error);
    });
  };

  const handleLockClick = () => {
    setIsLocked(!isLocked);
  };

  const run = () => {
    // Executing HTML, CSS & JS code
    const resultFrame = document.getElementById('result');
    if (resultFrame) {
      const resultDocument = resultFrame.contentDocument;
      resultDocument.body.innerHTML = `<style>${cssCode}</style>${htmlCode}`;
      
      // Create a script element and set its content to the JS code
      const script = resultDocument.createElement('script');
      script.text = jsCode;
      
      // Append the script to the iframe's document
      resultDocument.body.appendChild(script);
    }
  };

  useEffect(run, [htmlCode, cssCode, jsCode]);

  return (
    <div className="alignment">
      <h1>Code Verse</h1>
      <div className="code-editor">
        <div className="code">
          <div className="html-code">
            <h1>HTML</h1>
            <textarea
              id="html-code"
              value={htmlCode}
              readOnly={isLocked}
              onChange={(e) => setHtmlCode(e.target.value)}
            ></textarea>
          </div>
          <div className="css-code">
            <h1>CSS</h1>
            <textarea
              id="css-code"
              value={cssCode}
              readOnly={isLocked}
              onChange={(e) => setCssCode(e.target.value)}
            ></textarea>
          </div>
          <div className="js-code">
            <h1>JS</h1>
            <textarea
              id="js-code"
              value={jsCode}
              readOnly={isLocked}
              onChange={(e) => setJsCode(e.target.value)}
              spellCheck="false"
            ></textarea>
          </div>
          <div className="editor-toolbar">
            <button id="copy-button" onClick={handleCopyClick}>
              Copy
            </button>
            <button id="lock-button" onClick={handleLockClick}>
              {isLocked ? 'Unlock' : 'Lock'}
            </button>
          </div>
        </div>
        <iframe id="result"></iframe>
      </div>
    </div>
  );
}

export default App;
