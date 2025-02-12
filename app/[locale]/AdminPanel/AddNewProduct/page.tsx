"use client";
import React from "react";
import {useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Image from "next/image";
import "./style.css";
import { globalInfoType, catalogType, categoryType} from '../../../Type/type'

let sizeArray = ["XS", "S", "M", "L", "XL", "XXL"];

export default function AddNewProduct() {
  var size={

  }
  sizeArray.map((item, index) => {
    size[item]={
      name:item,
      count: 0,
      price: 0,
    }
  });
  const currentLanguage = useLocale(); // Get current language from next-intl
  const [message, setMessage] = useState<string | null>(null);
  const [globalInfo, setGlobalInfo] = useState<globalInfoType>({
    title_en: "",
    title_ge: "",
    description_ge: "",
    description_en: "",
    gender: "",
    tag: [],
    details_ge:[],
    details_en:[],
    selectedCategory:"",
    category:[]
  });
  const [catalogArray, setCatalog] = useState<catalogType[]>([
    {
      color: "#0a4b61",
      color_ge: "",
      color_en: "",
      sizeObj: {},
      img: [],
      base64Img:[],
      imageUploaded: false
    },
  ]);
  const router = useRouter();
 async function changeGender(gender: string) {
    try{
      let formData = new FormData();
      formData.append("gender", gender);
      const response = await fetch("/api/GetCategory", {
        method: "POST",
        body: formData, // FormData sets the correct Content-Type
      });
      const data = await response.json() as categoryType[];
      if (data.length == 0) {
        setMessage("კატეგორია არ მოიძებნა");
        return
      }
      setGlobalInfo((prevState) => ({
        ...prevState,
        gender: gender,
        category:data
      }));
    }catch(error){
      console.log(error)
    }
  }


  ///Size
  function changeSizeObj(catalogIndex:number, size:string,value:string, name:string) {
    let updatedCatalog = [...catalogArray];
    let sizeObj = updatedCatalog[catalogIndex].sizeObj;
    let numberValue = Number(value);
    sizeObj[size][name] = numberValue;
    setCatalog(updatedCatalog);
  }

  function handleSizeClick(checked:boolean, size:string, catalogIndex:number, sizeIndex:number) {
    let updatedCatalog = [...catalogArray];
    let sizeObj = updatedCatalog[catalogIndex].sizeObj
    if (checked) {
      sizeObj[size] = {
        name:size,
        count: 0,
        price: 0,
        required: true
      }
    } else {
      delete sizeObj[size]
    }
    // Update the state
    setCatalog(updatedCatalog);
  }

  function ChangeInput(catalogIndex:number, value:string, name:string) {
    let updatedCatalog = [...catalogArray];
    if (name == "img") {
      updatedCatalog[catalogIndex][name].push(value);
    } else {
      updatedCatalog[catalogIndex][name] = value;
    }
    setCatalog(updatedCatalog);
  }
  async function handleImageUpload(file:File, catalogIndex:number) {
    // Create a deep copy of the catalogArray
    const updatedCatalogArray = [...catalogArray];
    // Generate the URL for the image
    const url = URL.createObjectURL(file);

    // Convert the file to a base64 string
    const newBase64: string = await fileToBase64(file);

    // Update the specific element's img and base64Img arrays
    updatedCatalogArray[catalogIndex] = {
      ...updatedCatalogArray[catalogIndex],
      img: [...updatedCatalogArray[catalogIndex].img, url],
      base64Img: [...updatedCatalogArray[catalogIndex].base64Img, newBase64],
      imageUploaded: true,
    };

    console.log(updatedCatalogArray);
    // Update the state with the modified array
    setCatalog(updatedCatalogArray);
  }

  function deleteImage(catalogIndex:number,index:number) {
    let updatedCatalog = [...catalogArray]; // Create a copy of the catalogArray
    debugger
    updatedCatalog[catalogIndex].img.splice(index, 1); // Remove the image at the specified index from the img array  
    updatedCatalog[catalogIndex].base64Img.splice(index, 1);  // Remove the image at the specified index from the base64Img array 
    if(updatedCatalog[catalogIndex].img.length == 0)
    {
      updatedCatalog[catalogIndex].imageUploaded = false
    }
    console.log(updatedCatalog);
    setCatalog(updatedCatalog); // Update the state with the modified array
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // Event triggered when the file is successfully read
      reader.onload = () => {
        resolve(reader.result as string); // Ensure `result` is treated as a string
      };
      // Event triggered on an error
      reader.onerror = (error) => {
        reject(error);
      };
      // Read the file as a Data URL (Base64 string)
      reader.readAsDataURL(file);
    });
  }

  function changeTags(index:number, value:string) {
    let updateTag = [...globalInfo.tag];
    updateTag[index] = value;
    setGlobalInfo((prev)=>({
        ...prev,
        tag:updateTag
    }));
  }
  const removeTag = (index:number) => {
    const updatedTags = [...globalInfo.tag];
    updatedTags.splice(index, 1); // Remove the tag at the specified index
    setGlobalInfo((pre) => ({
      ...pre,
      tag: updatedTags,
    }));
  };


  function removeCatalog(index:number) {
    if (catalogArray.length > 0) {
      let updateCatalog = [...catalogArray];
      updateCatalog.splice(index, 1);
      setCatalog(updateCatalog);
    }
  }
  ///Add New Calor
  function AddCatalo() {
    let newCatalog = [
      ...catalogArray,
      {
        color: "#0a4b61",
        color_ge: "",
        color_en: "",
        sizeObj: {},
        img: [],
        base64Img:[],
        imageUploaded: false
      },
    ];
    setCatalog(newCatalog);
  }

  async function submitProduct() {
    try{
      debugger
        // Send the product data to the API
        let formData = new FormData();
        formData.append("globalInfo", JSON.stringify(globalInfo));
        formData.append("catalogArray", JSON.stringify(catalogArray));
        const response = await fetch("/api/AddNewProduct", {
          method: "POST",
          body: formData, // FormData sets the correct Content-Type
        });
        if (response.ok) {
          debugger
          const data = await response.json();
          router.refresh();
        }
    }
    catch(error){
      console.log(error)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      debugger
      const imgIsUploaded = catalogArray.every((item) => item.imageUploaded);
      const sizeIsChosen = catalogArray.every((item) => Object.keys(item.sizeObj).length > 0);
      if(!imgIsUploaded){
        setMessage("ატვირთეთ სურათი");
        event.preventDefault();
        hideMessageAfterDelay();
        return
      }
      else if(!sizeIsChosen){
        setMessage("ზომა არ არის არჩეული");
        event.preventDefault();
        hideMessageAfterDelay();
        return
      }
      event.preventDefault(); // Prevent default form submission
      submitProduct();
    }
    catch (error) {
      console.log(error);
    }
  };
  const hideMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage(null);
    }, 2000); // Hide message after 3 seconds
  };
  return (
    <form onSubmit={handleSubmit} className="addNewProduct-container">
      <div style={{width:"50%",margin:"0 auto"}}>
        <div className="addNewProduct-Info">
            <div
              style={{ borderBottom: "2px solid #98cddf", marginBottom: "20px" }}>
              <h3>ინფორმაცია</h3>
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }} >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "10px" }} htmlFor="title_en">Title</label>
                <input
                  required
                  style={{ padding: "10px" }}
                  id="title_en"
                  placeholder="Title"
                  type="text"
                  onChange={(e) => {
                    setGlobalInfo((prevState) => ({
                      ...prevState,
                      title_en: e.target.value,
                    }));
                  }}
                ></input>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "auto" }}>სათაური</label>
                <input style={{ padding: "10px" }}
                  required
                  id="title_ge"
                  placeholder="სათაური"
                  type="text"
                  onChange={(e) => {
                    setGlobalInfo((prevState) => ({
                      ...prevState,
                      title_ge: e.target.value,
                    }));
                  }}></input>
              </div>
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginTop: "20px",
              }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "10px" }}>Description</label>
                <textarea
                required
                  style={{ height: "100px", padding: "10px" }}
                  id="description_en"
                  placeholder="Description"
                  onChange={(e) => {
                    setGlobalInfo((prevState) => ({
                      ...prevState,
                      description_en: e.target.value,
                    }));
                  }}
                ></textarea>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "auto" }}>აღწერა</label>
                <textarea
                required
                  style={{ height: "100px", padding: "10px" }}
                  id="description_ge"
                  placeholder="აღწერა"
                  onChange={(e) => {
                    setGlobalInfo((prevState) => ({
                      ...prevState,
                      description_ge: e.target.value,
                    }));
                  }}></textarea>
              </div>
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginTop: "20px",
              }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "10px" }} htmlFor="title_en">სქესი</label>
                <select
                required
                onChange={(e) => {
                      changeGender(e.target.value);
                  }}
                  id="gender"
                  style={{ padding: "10px" }}>
                  <option value="">აირჩიე სქესი</option>
                  <option value="woman">ქალი</option>
                  <option value="man">კაცი</option>
                  <option value="girl">გოგო</option>
                  <option value="boy">ბიჭი</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "auto" }} htmlFor="title_en">კატეგორია</label>
                <select
                required
                  onChange={(e) => {
                    setGlobalInfo((prevState) => ({
                      ...prevState,
                      selectedCategory: e.target.value,
                    }));
                  }}
                  disabled={globalInfo.category.length === 0}
                  style={{ padding: "10px" }}
                  id="category">
                  <option value="">აირჩიე კატეგორია</option>
                  {globalInfo.category.length &&
                  globalInfo.category.map((item, index) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.label_ge}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}>
              <div style={{
                  marginBottom: "10px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}>
                <label>Tags</label>
                <svg
                  onClick={(e) => {
                    setGlobalInfo((prevState) => ({
                      ...prevState,
                      tag: [...prevState.tag, ""],
                    }));
                  }}
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"><path d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}>
                {globalInfo.tag.map((tag, index) => (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}
                    key={index}>
                    <input
                    required
                      style={{ padding: "10px" }}
                      placeholder={`Tag ${index + 1}`}
                      value={tag}
                      onChange={(e) => {
                        changeTags(index, e.target.value);
                      }}/>
                    <svg
                      onClick={() => removeTag(index)}
                      style={{ cursor: "pointer", width: "20px", height: "20px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"><path d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}>
                <div style={{
                    marginBottom: "10px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}>
                  <label>Product Details</label>
                  <svg
                    onClick={(e) => {
                      setGlobalInfo((prevState) => ({
                        ...prevState,
                        details_en: [...prevState.details_en, ""],
                      }));
                    }}
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"><path d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <div
                  style={{
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}>
                  {globalInfo.details_en.map((tag, index) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}
                      key={index}>
                      <input
                      required
                        style={{ padding: "10px" }}
                        placeholder={`Tag ${index + 1}`}
                        value={tag}
                        onChange={(e) => {
                          let details = [...globalInfo.details_en];
                          details[index] = e.target.value;
                          setGlobalInfo((prev)=>({
                              ...prev,
                              details_en:details
                          }));
                        }}/>
                      <svg
                        onClick={() => {
                          const details = [...globalInfo.details_en];
                          details.splice(index, 1); // Remove the tag at the specified index
                          setGlobalInfo((pre) => ({
                            ...pre,
                            details_en: details,
                          }));
                        }}
                        style={{ cursor: "pointer", width: "20px", height: "20px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"><path d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}>
                <div style={{
                    marginBottom: "10px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}>
                  <label>პროდუქტის დეტალები</label>
                  <svg
                    onClick={(e) => {
                      setGlobalInfo((prevState) => ({
                        ...prevState,
                        details_ge: [...prevState.details_ge, ""],
                      }));
                    }}
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"><path d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <div
                  style={{
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}>
                  {globalInfo.details_ge.map((tag, index) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}
                      key={index}>
                      <input
                      required
                        style={{ padding: "10px" }}
                        placeholder={`Tag ${index + 1}`}
                        value={tag}
                        onChange={(e) => {
                          let details = [...globalInfo.details_ge];
                          details[index] = e.target.value;
                          setGlobalInfo((prev)=>({
                              ...prev,
                              details_ge:details
                          }));
                        }}/>
                      <svg
                        onClick={() => {
                          const details = [...globalInfo.details_ge];
                          details.splice(index, 1); // Remove the tag at the specified index
                          setGlobalInfo((pre) => ({
                            ...pre,
                            details_ge: details,
                          }));
                        }}
                        style={{ cursor: "pointer", width: "20px", height: "20px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"><path d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {catalogArray.map((catalog, catalogIndex) => {
            return (
              <div key={`catalog${catalogIndex}`} className="addNewProduct-catalog">
                <div
                  style={{
                    borderBottom: "2px solid #98cddf",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                    <svg style={{ cursor: "pointer", width: "20px", height: "20px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => {
                      removeCatalog(catalogIndex);
                    }}>
                      <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                  </svg>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "20px",
                  }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="color" style={{ marginBottom: "10px" }}>აირჩიე ფერი</label>
                    <input
                      required
                      id={`color${catalogIndex}`}
                      name="color"
                      onChange={(e) => {
                        ChangeInput(catalogIndex, e.target.value, e.target.name);
                      }}
                      style={{ width: "50%", height: "100%" }}
                      value={`${catalog.color}`}
                      type="color"/>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="color_ge" style={{ marginBottom: "auto" }}>ფერი</label>
                    <input
                      required
                      id={`color_ge${catalogIndex}`}
                      name="color_ge"
                      value={`${catalog.color_ge}`}
                      style={{ padding: "10px" }}
                      type="text"
                      onChange={(e) => {
                        ChangeInput(catalogIndex, e.target.value, e.target.name);
                      }}
                    ></input>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="color_en" style={{ marginBottom: "10px" }}>color</label>
                    <input
                      id={`color_en${catalogIndex}`}
                      name="color_en"
                      value={`${catalog.color_en}`}
                      style={{ padding: "10px" }}
                      type="text"
                      onChange={(e) => {
                        ChangeInput(catalogIndex, e.target.value, e.target.name);
                      }}></input>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gap: "10px",
                    marginTop: "10px",
                  }}>
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}>Size</th>
                        <th style={{ textAlign: "center" }}>რაოდენობა</th>
                        <th style={{ textAlign: "center" }}>ერთეულის ფასი</th>
                      </tr>
                    </thead>
                    <tbody style={{ maxHeight: "300px" }}>
                      {sizeArray.map((sizeElement, sizeIndex) => {
                        return (
                          <tr key={"tr" + sizeElement}>
                            <td className="sizeB">
                              <div className="sizeDiv"
                                style={{ position: "relative" }}>
                                <input
                                  id={`checkbox-${sizeElement}-${catalogIndex}`}
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
                                  checked={catalog.sizeObj[sizeElement] != undefined}
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleSizeClick(e.target.checked, sizeElement, catalogIndex, sizeIndex);
                                  }}
                                />
                                <label style={{
                                    width: "100%",
                                    height: "20px",
                                    borderRadius: "5px",
                                    fontSize: "10px",
                                  }}
                                  htmlFor={`checkbox-${sizeElement}-${catalogIndex}`}
                                  className="size_Button">
                                  {sizeElement}
                                </label>
                              </div>
                            </td>
                            <td>
                              <input
                                id={`${sizeElement}count`}
                                disabled={(catalog.sizeObj[sizeElement] == undefined)}
                                required={catalog.sizeObj[sizeElement]?.required}
                                value={
                                  catalog.sizeObj?.[sizeElement]!= undefined
                                    ? catalog.sizeObj[sizeElement].count
                                    : ""}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  border: "none",
                                  textAlign: "center",
                                }}
                                name="count"
                                type="number"
                                min={1}
                                max={100}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^(?!0\d)\d*$/.test(value)) { // Regular expression to reject leading zeros
                                    changeSizeObj(catalogIndex, sizeElement, value, e.target.name);
                                  }
                                }}
                              />
                            </td>
                            <td>
                              <input
                                id={`${sizeElement}price`}
                                disabled={(catalog.sizeObj[sizeElement] == undefined)}
                                required={catalog.sizeObj[sizeElement]?.required}
                                value={
                                  catalog.sizeObj?.[sizeElement]!= undefined
                                    ? catalog.sizeObj[sizeElement].price
                                    : ""
                                }
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  border: "none",
                                  textAlign: "center",
                                }}
                                type="number"
                                name="price"
                                pattern="^[1-9][0-9]*$"
                                title="Please enter a number without leading zeros"
                                min={1}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^(?!0\d)\d*$/.test(value)) { // Regular expression to reject leading zeros
                                    changeSizeObj(catalogIndex, sizeElement, value, e.target.name);
                                  }
                                }}/>
                            </td>
                          </tr>);})}
                    </tbody>
                  </table>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gridTemplateRows: "1fr 1fr",
                      gap: "5px",
                      alignItems: "center",
                      border: "1px dashed #98cddf",
                      borderRadius: "5px",
                    }}>
                    {catalog.img.length > 0 &&
                      catalog.img.map((element, index) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              padding: "10px",
                              borderRadius: "5px",
                              position: "relative",
                            }}
                            key={"image" + index}>
                            <Image
                              style={{
                                borderRadius: "5px",
                                border: "1px solid #98cddf",
                              }}
                              width={120}
                              height={120}
                              alt=""
                              src={element}/>
                            <svg
                              style={{
                                cursor: "pointer",
                                width: "20px",
                                height: "20px",
                              }}
                              onClick={() => {
                                deleteImage(catalogIndex, index);
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="red"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                            </svg>
                          </div>
                        );
                      })}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <svg
                        onClick={() => {
                          document
                            .getElementById(`${catalogIndex}-ImgInput`)
                            .click();
                        }}
                        style={{
                          cursor: "pointer",
                          height: "100px",
                          width: "100px",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"/>
                      </svg>
                      <p>Upload Image</p>
                      <input
                        onChange={(e) => {
                          handleImageUpload(e.target.files[0], catalogIndex);
                        }}
                        id={`${catalogIndex}-ImgInput`}
                        style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                        value={""}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="catalog-Header">
            <h3>დაამატე ფერი</h3>
            <svg
              onClick={() => {
                AddCatalo();
              }}
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <button
            type="submit"
            style={{ padding: '10px', marginTop: '20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px' }}
          > Add Product to Stripe
          </button>
          {message && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                transition: "all 0.5s linear",
                padding: "20px",
                backgroundColor: message.includes("successfully") ? "#d4edda" : "#f8d7da",
                color: message.includes("successfully") ? "#155724" : "#721c24",
                border: `1px solid ${message.includes("successfully") ? "#c3e6cb" : "#f5c6cb"}`,
                borderRadius: "5px",
                textAlign: "center",
                zIndex: 1000,
              }}
            >
              {message}
            </div>
          )}
      </div>
    </form>
  );
}
