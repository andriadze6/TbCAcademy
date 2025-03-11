import { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import './style/ToolTip2.css';

export default function Tooltip({ text, position }) {
    return ReactDOM.createPortal(
        <div
          className="tooltip"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
        <div className="tooltip-arrow"></div>
          {text}
        </div>,
        document.body
      );
}
