"use client";
import React from 'react';
import '../assets/css/sizeButton.css';
// import'../global.css';
export default function SizeButton({ size }) {
  function test() {
    console.log("clicked");
  }

  return (
    <div className='sizeDiv' style={{ position: "relative" }}>
      <input
        id={`radio-${size}`}
        name="size" // Group radio buttons by name
        onClick={() => test()}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          cursor: "pointer",
          backgroundColor: "transparent",
          opacity: "0",
        }}
        type='checkbox'
      />
      <label
      style={{
        width:"100%",
        height:"20px",
        borderRadius:"5px",
        fontSize:"10px"
      }}
        htmlFor={`radio-${size}`}
        className="size_Button">
        {size}
      </label>
    </div>
  );
}
