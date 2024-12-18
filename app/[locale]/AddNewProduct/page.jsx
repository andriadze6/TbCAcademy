'use client'
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import './style.css'
import { get } from 'http';



 let sizeArray = ["XS", "S", "M", "L", "XL", "XXL"];

export default function AddNewProduct() {
    const [tags, setTags] = useState(["","",""]);
    const[addCatalog, setAddCatalog] = useState([""]);
    const [imageArray, setImage] = useState([]);
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
      updatedTags[index] = value;
      setTags(updatedTags);
    };

    const removeTag = (index) => {
      const updatedTags = [...tags];
      updatedTags.splice(index, 1); // Remove the tag at the specified index
      setTags(updatedTags);
    }

    function handleSizeClick(checked, size){
        debugger
        if(checked){
            document.getElementById(`${size}count`).disabled = false;
            document.getElementById(`${size}price`).disabled = false;
        }else{
            document.getElementById(`${size}count`).disabled = true;
            document.getElementById(`${size}price`).disabled = true;
            document.getElementById(`${size}count`).value = "";
            document.getElementById(`${size}price`).value = "";
        }
    }

    function handleImageUpload(file) {
        debugger
        let url = URL.createObjectURL(file)
        const updateImgArray = [...imageArray,url];
        setImage(updateImgArray)
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
            <div style={{display: "grid",gridTemplateColumns: "1fr 2fr", gap: "10px", marginTop: "10px"}}>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>Size</th>
                            <th style={{ textAlign: "center" }}>რაოდენობა</th>
                            <th style={{ textAlign: "center" }}>ერთეულის ფასი</th>
                        </tr>
                    </thead>
                    <tbody style={{maxHeight:"300px"}}>
                        {sizeArray.map((size, index) => (
                            <tr key={"tr" + size}>
                                <td className='sizeB'>
                                    <div className='sizeDiv' style={{ position: "relative" }}>
                                        <input
                                            id={`checkbox-${size}`}
                                            name="size" // Group radio buttons by name
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
                                            onClick={(e)=>{handleSizeClick(e.target.checked,size)}}
                                        />
                                        <label
                                        style={{
                                            width:"100%",
                                            height:"20px",
                                            borderRadius:"5px",
                                            fontSize:"10px"
                                        }}
                                            htmlFor={`checkbox-${size}`}
                                            className="size_Button">
                                            {size}
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <input id={`${size}count`} style={{ width: "100%", height: "100%", border: "none", textAlign: "center" }} type="number" disabled />
                                </td>
                                <td>
                                    <input id={`${size}price`} style={{ width: "100%", height: "100%",border: "none",textAlign: "center" }} type="number" disabled/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                        gridTemplateRows: "1fr 1fr", gap: "5px",
                        alignItems:"center",
                        border: "1px dashed #98cddf",
                        borderRadius: "5px"}}>
                        {
                            imageArray.length > 0 &&(
                                imageArray.map((element,index)=>{
                                    return(
                                        <div style={{display:"flex",justifyContent:"center", padding:"10px", borderRadius:"5px", position:"relative"}} key={index}>
                                            <Image style={{
                                                borderRadius:"5px",
                                                border: "1px solid #98cddf",
                                            }}
                                            width={120} height={120}
                                            alt='' src={element}/>
                                            <svg onClick={() => removeTag(index)} style={{ cursor: "pointer", width: "20px", height: "20px" }}
                                                xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke="currentColor" >
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </div>
                                    )
                                })
                            )
                        }
                    <div style={{ display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%"}}>
                        <svg onClick={()=>{document.getElementById("imgInput").click()}} style={{ cursor: "pointer", height: "100px", width: "100px" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                        </svg>
                        <p>Upload Image</p>
                        <input onChange={(e)=>{handleImageUpload(e.target.files[0])}} id="imgInput" style={{ display: "none" }} type="file" accept="image/*"></input>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }