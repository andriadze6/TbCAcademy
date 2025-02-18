import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./style/toolTip.css";

export default function Tooltip({ text, position }) {
    return ReactDOM.createPortal(
        <div
          className="tooltip"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          {text}
          <div className="tooltip-arrow"></div>
        </div>,
        document.body
      );
}