import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.scss";
import InputItem from "./components/InputItem";

function App() {
  // const [count, setCount] = useState(0);
  const [cssOption, setCssOption] = useState("font-size");
  const [baseValue, setBaseValue] = useState(900);
  const [minFontSize, setminFontSize] = useState(14);
  const [maxFontSize, setmaxFontSize] = useState(16);
  // InputCheck
  const InputCheck = (chekcType, getValue) => {
    const inputValue = getValue;
    const lastChar = inputValue.charAt(inputValue.length - 1);

    switch (chekcType) {
      case "number":
        return !isNaN(lastChar) || '.' === lastChar;
      case "str" || "string":
        return isNaN(lastChar);
    }
  };

  const handleCssOptionChange = (event) => {
    const getValue = event.target.value;
    if (InputCheck("str", getValue)) setCssOption(getValue);
  };
  const handleBaseChange = (event) => {
    const getValue = event.target.value;
    if (InputCheck("number", getValue)) setBaseValue(getValue);
  };

  const handleMinFontSizeChange = (event) => {
    const getValue = event.target.value;
    if (InputCheck("number", getValue)) setminFontSize(getValue);
  };

  const handleMaxFontSizeChange = (event) => {
    const getValue = event.target.value;
    if (InputCheck("number", getValue)) setmaxFontSize(getValue);
  };

  const generateCssOption = () => {
    return cssOption;
  };
  const generateCss = (type) => {
    const minsize = minFontSize;
    const maxSize = maxFontSize;
    const variableSize = Number((minFontSize / baseValue) * 100).toFixed(3);

    // const cssStyleNew = `${generateCssOption()}: clamp(${minsize}px, ${variableSize}vw, ${maxSize}px);`;
    // const cssStyleAlt = `${generateCssOption()}: max(${minsize}px, min(${variableSize}vw, ${maxSize}px));`;
    const cssStyleNew = `clamp(${minsize}px, ${variableSize}vw, ${maxSize}px);`;
    const cssStyleAlt = `max(${minsize}px, min(${variableSize}vw, ${maxSize}px));`;

    let cssStyle;

    switch (type) {
      case "new":
        cssStyle = cssStyleNew;
        break;
      case "alt":
        cssStyle = cssStyleAlt;
        break;
    }

    return cssStyle;
  };

  const clickToCopy = (event) => {
    // const textCopyEl = document.querySelector(".copy-content");
    const textCopyEl = event.currentTarget.querySelectorAll(".copy-content")[0];
    // const index = Array.from(textCopyElments.parentElement.parentElement.children).index;

    const textToCopy = textCopyEl.innerText;
    const resultCopiedEl = event.currentTarget.querySelectorAll(".result-copied")[0];
    const beforeResultCopy = "Click To Copy";
    const afterResultCopy = "Copied!!";
    // console.log(resultCopiedEl);

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log(`テキストがコピーされました:\n${textToCopy}`);
        resultCopiedEl.innerText = afterResultCopy;
        setTimeout(() => {
          resultCopiedEl.innerText = beforeResultCopy;
        }, 2000);
      })
      .catch((err) => {
        console.log(`テキストがコピーされませんでした:\n${err}`);
      });
  };

  return (
    <>
      <div className="text-align-center">
        <h1>Clamp Generator</h1>
        <p>Generate settings for non-supporting browsers, too.</p>
      </div>
      <div className="css-generator-container">
        <div className="input-container">
          <div className="input-box-area font-size-normal">
            <InputItem displayText="CSS option" placeholder="example: font-size" inputValue={cssOption} onChange={handleCssOptionChange} unit="" />
          </div>
          <div className="input-box-area font-size-normal base">
            <InputItem displayText="Base width or height" placeholder="example: 900" inputValue={baseValue} onChange={handleBaseChange} />
          </div>
          <div className="input-box-area font-size-normal specify">
            <InputItem displayText="Minimum font size" placeholder="example: 14" inputValue={minFontSize} onChange={handleMinFontSizeChange} />
            <InputItem displayText="Maximum font size" placeholder="example: 16" inputValue={maxFontSize} onChange={handleMaxFontSizeChange} />
          </div>
        </div>
        <div className="output-container">
          <div className="output-txt-area font-size-normal">
            <p className="output-ttl">Output css style</p>
            <p className="output-txt" onClick={clickToCopy}>
              <span className="copy-content">{generateCss("new")}</span>
              <span className="result-copied">click to copy</span>
            </p>
            <p className="output-txt" onClick={clickToCopy}>
              <span className="copy-content">{generateCss("alt")}</span>
              <span className="result-copied">click to copy</span>
            </p>
            <p className="font-size-small">vw = Minimum font size / Base width or height * 100</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
