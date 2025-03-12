import { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import './style/ToolTip2.css';

export default function Tooltip({ text, position }) {
    return ReactDOM.createPortal(
        <div
          className="tooltip2"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
        <div className="tooltip-arrow2"></div>
          {text}
        </div>,
        document.body
      );
}
