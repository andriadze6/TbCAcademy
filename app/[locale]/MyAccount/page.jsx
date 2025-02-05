'use client'
import { use, useContext, useState } from "react";
import { useAuth, AuthProvider, AuthContext } from "../../providers/UserSessionProvider";
import { createClient } from "../../../utils/supabase/client";
import {useTranslations, useLocale } from 'next-intl';
import './style.css'
import { faL } from "@fortawesome/free-solid-svg-icons";


export default function MyAccount() {
  // const {user}  = useContext(AuthContext);
  const[edit, setEdit] = useState(false);
  const t = useTranslations('LoginCreateAccount');
  const [checker, setChecker] = useState({
        isFirstNameValid: true,
        isLastNameValid:true,
        isPhoneValid:true,
        isCityValid:true,
        isStreetAddressValid:true,
        isApartmentNumberValid:true,
        isZipCodeValid:true,
});
  const { user } = useContext(AuthContext);
  async function CreateNewAddress(){
    const userID = user.id;
    const firstName = document.getElementById("first_Name").value;
    const lastName = document.getElementById("last_Name").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const streetAddress = document.getElementById("street_Address").value;
    const apartmentNumber = document.getElementById("apartment_Number").value;
    const zipCode = document.getElementById("zip_Code").value;
    const formData = new FormData();
    formData.append("userID", userID);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("streetAddress", streetAddress);
    formData.append("apartmentNumber", apartmentNumber);
    formData.append("zipCode", zipCode);
    let isInputValid = checkInputs(firstName, lastName, phone, city, streetAddress, apartmentNumber, zipCode);
    if(isInputValid){
      const response = await fetch("/api/CreateAddress", {
        method: "POST",
        body: formData, // FormData sets the correct Content-Type
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }else{
        console.log(response);
      }
    }
  }

  function checkInputs( first_Name, last_Name, phone, city, street_Address, apartment_Number, zip_Code){
    let  isFirstNameValid = first_Name.length >0 &&  first_Name.trim("") != "";
    let  isLastNameValid = last_Name.length >0 &&  last_Name.trim("") != "";
    let  isPhoneValid = phone.length >0 &&  phone.trim("") != "";
    let  isCityValid = city.length >0 &&  city.trim("") != "";
    let  isStreetAddressValid = street_Address.length >0 &&  street_Address.trim("") != "";
    let  isApartmentNumberValid = apartment_Number.length >0 &&  apartment_Number.trim("") != "";
    let  isZipCodeValid = zip_Code.length >0 &&  zip_Code.trim("") != "";
    if(!isFirstNameValid || !isLastNameValid || !isPhoneValid || !isCityValid || !isStreetAddressValid || !isApartmentNumberValid || !isZipCodeValid){
      setChecker({isFirstNameValid, isLastNameValid, isPhoneValid, isCityValid, isStreetAddressValid, isApartmentNumberValid, isZipCodeValid})
      return false
    }else{
      setChecker({isFirstNameValid, isLastNameValid, isPhoneValid, isCityValid, isStreetAddressValid, isApartmentNumberValid, isZipCodeValid})
      return true
    }
  }

  return (
    <>
        {
          user &&
          (
              <>
                <div style={{display:"flex", gap:"10px", alignItems:"center",padding:"10px 0px", borderBottom:"1px solid #708d97"}}>
                  <h3>Account details</h3>
                  <svg onClick={()=>{setEdit(!edit)}} style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg"  width="14" height="14" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg>
                </div>
                <div style={{marginTop:"20px"}}>
                  <div style={{marginBottom:"20px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px"}}>
                    <div>
                        <input
                        className='input'
                        type="text"
                        placeholder={checker.isFirstNameValid ? t("Name") : t("Type") + " " + t("Name")}
                        style={{borderColor: !checker.isFirstNameValid && "red"}}
                        name="" id="first_Name" />
                    </div>
                    <div>
                        <input
                        className='input'
                        type="text"
                        placeholder={checker.isLastNameValid ? t("LastName") : t("Type") + " " + t("LastName") }
                        style={{borderColor: !checker.isLastNameValid && "red"}}
                        name="" id="last_Name" />
                    </div>
                  </div>
                  <div style={{marginBottom:"20px", display:"grid"}}>
                    <div>
                      <input
                      className='input'
                      type="phone"
                      placeholder={checker.isPhoneValid ? t("Phone") : t("Type") + " " + t("Phone")}
                      style={{borderColor: !checker.isPhoneValid && "red"}}
                      name="" id="phone" />
                    </div>
                  </div>
                  <div style={{marginBottom:"20px", display:"grid"}}>
                    <label>{t("StreetAddress")}</label>
                    <div>
                      <input
                      className='input'
                      type="text"
                      placeholder={checker.isStreetAddressValid ? t("StreetAddress") : t("Type") + " " + t("StreetAddress")}
                      style={{borderColor: !checker.isStreetAddressValid && "red"}}
                      name="" id="street_Address" />
                    </div>
                  </div>
                  <div style={{marginBottom:"20px", display:"grid"}}>
                    <div>
                      <input
                      className='input'
                      type="text"
                      placeholder={t("buildingNumber")}
                      name="" id="apartment_Number" />
                    </div>
                  </div>
                  <div style={{marginBottom:"20px", display:"grid"}}>
                    <label>{t("City")}</label>
                    <div>
                      <input
                      className='input'
                      type="text"
                      placeholder={checker.isCityValid ? t("City") : t("City") + " " + t("City")}
                      style={{borderColor: !checker.isCityValid && "red"}}
                      name="" id="city" />
                    </div>
                  </div>
                  <div style={{marginBottom:"20px", display:"grid", }}>
                    <label>{t("Region")+"/"+t("Municipality")}</label>
                    <div>
                      <input
                      className='input'
                      type="text"
                      placeholder=""
                      name="" id="region" />
                    </div>
                  </div>
                  <div style={{marginBottom:"20px", display:"grid", }}>
                    <label>{t("City")}</label>
                    <div>
                      <input
                      className='input'
                      type="text"
                      placeholder={checker.isZipCodeValid ? t("PostalCode") : t("Type") + " " + t("PostalCode")}
                      style={{borderColor: !checker.isZipCodeValid && "red"}}
                      name="" id="zip_Code" />
                    </div>
                  </div>
                  <div style={{marginBottom:"20px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px"}}>
                        <button onClick={CreateNewAddress} className="save-Changes">{t("SaveChanges")}</button>
                  </div>
                </div>
              </>
          )
        }
    </>
  );
}