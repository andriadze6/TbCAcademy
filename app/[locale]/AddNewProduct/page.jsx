'use client'
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import SizeButton from '../components/sizeButton';
import './style.css'



 let sizeArray = ["XS", "S", "M", "L", "XL", "XXL"];

export default function AddNewProduct() {
    const [tags, setTags] = useState(["","",""]);
    const[addCatalog, setAddCatalog] = useState([""]);

    const increaseCatalogNumber = () => {
      setAddCatalog([...addCatalog, ""]); // Add a new empty tag input
    };

    const handleCatalogChange = (index, value) => {
      const updatedTags = [...addCatalog];
      updatedTags[index] = value; // Update the specific tag
      setAddCatalog(updatedTags);
    }

    const increaseTagNumber = () => {
      setTags([...tags, ""]); // Add a new empty tag input
    };
    const handleTagChange = (index, value) => {
      const updatedTags = [...tags];
      updatedTags[index] = value; // Update the specific tag
      setTags(updatedTags);
    };

    const removeTag = (index) => {
      const updatedTags = [...tags];
      updatedTags.splice(index, 1); // Remove the tag at the specified index
      setTags(updatedTags);
    }

    return (
      <div className="addNewProduct-container">
        <h4>add new product</h4>
        <div className="addNewProduct-Info">
            <div style={{borderBottom: "2px solid #98cddf", marginBottom: "20px" }}>
                <h3>ინფორმაცია</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "10px" }} htmlFor="title_en">Title</label>
                    <input style={{ padding: "10px" }} id="title_en" placeholder="Title" type="text"></input>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "auto" }}>სათაური</label>
                    <input style={{ padding: "10px" }} id="title_ge" placeholder="სათაური" type="text"></input>
                </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "10px" }}>Description</label>
                    <textarea style={{ height: "100px", padding: "10px" }} id="description_en" placeholder="Description" type="text"></textarea>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "auto" }}>აღწერა</label>
                    <textarea style={{ height: "100px", padding: "10px" }} id="description_ge" placeholder="აღწერა" type="text"></textarea>
                </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "10px" }} htmlFor="title_en">სქესი</label>
                <select style={{ padding: "10px" }} type="text">
                    <option value="woman">ქალი</option>
                    <option value="man">კაცი</option>
                    <option value="girl">გოგო</option>
                    <option value="boy">ბიჭი</option>
                </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "auto" }} htmlFor="title_en">კატეგორია</label>
                <select style={{ padding: "10px" }} id="title_ge" type="text">
                    <option value="pants">შარვალი</option>
                    <option value="jeans">ჯინსი</option>
                    <option value="shorts">შორტები</option>
                    <option value="coat">ქურთუკი</option>
                </select>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
                <div style={{ marginBottom: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
                <label>Tags</label>
                <svg
                    onClick={increaseTagNumber}
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                </div>
                <div style={{boxSizing:"border-box", display:"flex",  justifyContent:"space-between", flexWrap:"wrap", gap:"10px"}}>
                    {tags.map((tag, index) => (
                        <div style={{ display: "flex", alignItems: "center",gap: "10px" }} key={index}>
                            <input
                                style={{ padding: "10px" }}
                                placeholder={`Tag ${index + 1}`}
                                value={tag}
                                onChange={(e) => handleTagChange(index, e.target.value)}
                                />
                                <svg onClick={() => removeTag(index)} style={{ cursor: "pointer", width: "20px", height: "20px" }} 
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                    <path d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                                </svg>
                        </div>))}
                </div>
            </div>
        </div>
        <div className='addNewProduct-catalog'>
            <div style={{borderBottom: "2px solid #98cddf", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <h3>კატალოგი</h3>
                <svg
                    onClick={increaseTagNumber}
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "10px" }} htmlFor="title_en">აირჩიე ფერი</label>
                    <input style={{width: "50%", height: "100%"}}  value="#0a4b61" type="color"/>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "auto" }} htmlFor="title_en">ფერი</label>
                    <input style={{ padding: "10px" }} type="text"></input>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "10px" }} htmlFor="title_en">color</label>
                    <input style={{ padding: "10px" }} type="text"></input>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>Size</th>
                            <th style={{ textAlign: "center" }}>რაოდენობა</th>
                            <th style={{ textAlign: "center" }}>ერთეულის ფასი</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sizeArray.map((size, index) => (
                            <tr key={index}>
                                <td>
                                    <SizeButton size={size} />
                                </td>
                                <td>
                                    <input style={{ width: "100%" }} type="text" />
                                </td>
                                <td>
                                    <input style={{ width: "100%" }} type="text" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                </div>
            </div>
        </div>
      </div>
    );
  }