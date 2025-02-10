'use client'
import { useEffect, useContext, useState, useCallback } from "react";
import { useAuth, AuthProvider, AuthContext } from "../../providers/UserSessionProvider";
import { supabase } from "../../../utils/supabase/client";
import {useTranslations, useLocale } from 'next-intl';
import './style.css'
import Link from "next/link";
import { DeliveryAddressType } from "../../Type/type";
import Popup from '../components/Popup';


export default function MyAccount() {
  const {user}  = useContext(AuthContext);
  const t = useTranslations('LoginCreateAccount');
  const emptyAddress = {
    id: "",
    user_ID: "",
    first_Name: "",
    last_Name: "",
    phone: "",
    city: "",
    region: "",
    street_Address: "",
    apartment_Number: "",
    zip_Code: "",
    default: false,
  }
  const [checker, setChecker] = useState({
        isFirstNameValid: true,
        isLastNameValid:true,
        isPhoneValid:true,
        isCityValid:true,
        isStreetAddressValid:true,
        isApartmentNumberValid:true,
        isZipCodeValid:true,
  });
  const [data, setData] = useState<{
    deliveryAddress: DeliveryAddressType[];
    showPopup: boolean;
    address: DeliveryAddressType
    edit:boolean
  }>({
    deliveryAddress: [],
    showPopup: false,
    address: emptyAddress,
    edit:false
  });
  const fetchDeliveryAddress = useCallback(async () => {
    if (!user) return; // Prevent fetching if user is not loaded yet
    try {
      const response = await fetch("/api/DeliveryAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: user.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch delivery address");
      }
      const data = await response.json() as DeliveryAddressType[];
      setData({
        deliveryAddress: data,
        showPopup: false,
        address:emptyAddress,
        edit:false
      });
    } catch (error) {
      console.error("Error fetching delivery address:", error);
    }
  },[user]);

    // Run fetchDeliveryAddress when the component mounts
    useEffect(() => {
      if (user) {
        fetchDeliveryAddress();
      }
    }, [user,fetchDeliveryAddress]);
    // Set up Supabase real-time listener
    useEffect(() => {
      if (!user) return; // Ensure user is available before setting up listener
      console.log("Setting up Supabase listener for user:", user.id);
      const channel = supabase
        .channel("custom-filter-channel")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "DeliveryAddress",
            filter: `user_ID=eq.${user.id}`,
          },
          (payload) => {
            console.log("Change received!", payload);
            fetchDeliveryAddress(); // Re-fetch when data changes
          }
        )
        .subscribe();
      // Cleanup function to unsubscribe when the component unmounts
      return () => {
        console.log("Unsubscribing from Supabase channel");
        channel.unsubscribe();
      };
    }, [user,fetchDeliveryAddress]);



  async function CreateNewAddress() {
    const userID = user.id;
    const firstName = (document.getElementById("first_Name") as HTMLInputElement).value;
    const lastName = (document.getElementById("last_Name") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const city = (document.getElementById("city") as HTMLInputElement).value;
    const streetAddress = (document.getElementById("street_Address") as HTMLInputElement).value;
    const apartmentNumber = (document.getElementById("apartment_Number") as HTMLInputElement).value;
    const zipCode = (document.getElementById("zip_Code") as HTMLInputElement).value;
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
 async function UpdateAddress(){
  const addressID = data.address.id;
  debugger
  const con = data.deliveryAddress.some((element) => {
    if (element.id === addressID) {
        return Object.entries(data.address).some(([key, value]) => element[key] !== value);
    }
    return false;
});
  debugger
  if(con){
    const formData = new FormData();
    formData.append("data",JSON.stringify(data.address) );
    const response = await fetch("/api/UpdateAddress", {
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

  async function DeleteAddress(ID:string) {
    debugger
    const formData = new FormData();
    formData.append("ID", ID)
    try {
      const response = await fetch("/api/DeleteAddress", {
        method: "POST",
        body: formData, // FormData sets the correct Content-Type
      });
      if(response.ok){
        fetchDeliveryAddress()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
        <div style={{display:"flex", gap:"10px", alignItems:"center",padding:"10px 0px", borderBottom:"1px solid #708d97"}}>
          <h3>Account details</h3>
        </div>
        <div style={{display:"flex", gap:"20px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr", gap:"10px", marginTop:"20px"}}>
            <button className="add_new_address" onClick={() => setData(prev => ({ ...prev, showPopup: true, edit:false }))} style={{background:"transparent=",minHeight:"250px", minWidth:"250px",cursor:"pointer"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              <span>Add Address</span>
            </button>
            {
             data.deliveryAddress.length > 0 && data.deliveryAddress.map((address, index) => {
                return(
                  <div key={address.id}style={{transition:"all .5s ease-out",border:"1px solid #708d97", position:"relative",borderRadius:"6px", maxHeight:"250px", minWidth:"250px", boxShadow:"0px 5px 5px rgba(155, 177, 207, 0.685)"}}>

                    <div>
                      <div className="address-Div" style={{display:"flex",flexDirection:"column", gap:"10px",padding:"10px"}}>
                          <h4 style={{borderBottom:"1px solid #708d97", padding:"10px"}}>{address.first_Name} {address.last_Name}</h4>
                          <p>{address.city}</p>
                          {
                            address.region && <p>{address.region}</p>
                          }
                          <p>{address.street_Address}</p>
                          <p>{address.apartment_Number}</p>
                          <p>{t("Phone")}:{address.phone}</p>
                          <p>{t("PostalCode")}:{address.zip_Code}</p>
                      </div>
                      <div style={{display:"flex",gap:"10px", padding:"10px"}}>
                        <button onClick={() => setData(prev => ({ ...prev, showPopup: true, address:address, edit:true }))} style={{color:"blue", cursor:'pointer',background:"transparent",border:"none",textDecoration:"underline"}}>Edit</button>
                        <button onClick={()=>{
                          DeleteAddress(address.id)
                        }}  style={{color:"blue", background:"transparent", cursor:'pointer',border:"none",textDecoration:"underline"}}>Delete</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {
            data.showPopup && (
            <Popup onClose={() => setData(prev => ({ ...prev,
            showPopup: false,
            address:emptyAddress }))}>
            <div style={{marginTop:"20px"}}>
              <div style={{marginBottom:"20px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px"}}>
                <div>
                    <input
                    className='input'
                    type="text"
                    placeholder={checker.isFirstNameValid ? t("Name") : t("Type") + " " + t("Name")}
                    style={{borderColor: !checker.isFirstNameValid && "red"}}
                    name="" id="first_Name" 
                    value={data.address.first_Name}
                    onChange={(e) => setData((prev) => ({
                      ...prev,
                      address: { ...prev.address, first_Name: e.target.value }
                    }))} />
                </div>
                <div>
                    <input
                    className='input'
                    type="text"
                    placeholder={checker.isLastNameValid ? t("LastName") : t("Type") + " " + t("LastName") }
                    style={{borderColor: !checker.isLastNameValid && "red"}}
                    name="" id="last_Name" 
                    value={data.address.last_Name}
                    onChange={(e) => setData((prev) => ({
                      ...prev,
                      address: { ...prev.address, last_Name: e.target.value }
                    }))} />
                </div>
              </div>
              <div style={{marginBottom:"20px", display:"grid"}}>
                <div>
                  <input
                  className='input'
                  type="phone"
                  placeholder={checker.isPhoneValid ? t("Phone") : t("Type") + " " + t("Phone")}
                  style={{borderColor: !checker.isPhoneValid && "red"}}
                  name="" id="phone" 
                  value={data.address.phone}
                  onChange={(e) => setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, phone: e.target.value }
                  }))} />
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
                  name="" id="street_Address" 
                  value={data.address.street_Address}
                  onChange={(e) => setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, street_Address: e.target.value }
                  }))} />
                </div>
              </div>
              <div style={{marginBottom:"20px", display:"grid"}}>
                <div>
                  <input
                  className='input'
                  type="text"
                  placeholder={t("buildingNumber")}
                  name="" id="apartment_Number" 
                  value={data.address.apartment_Number}
                  onChange={(e) => setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, apartment_Number: e.target.value }
                  }))}/>
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
                  name="" id="city"
                  value={data.address.city}
                  onChange={(e) => setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, city: e.target.value }
                  }))}/>
                </div>
              </div>
              <div style={{marginBottom:"20px", display:"grid", }}>
                <label>{t("Region")+"/"+t("Municipality")}</label>
                <div>
                  <input
                  className='input'
                  type="text"
                  placeholder=""
                  name="" id="region"
                  value={data.address.region}
                  onChange={(e) => setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, region: e.target.value }
                  }))} />
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
                  name="" id="zip_Code"
                  value={data.address.zip_Code}
                  onChange={(e) => setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, zip_Code: e.target.value }
                  }))}/>
                </div>
              </div>
              <div style={{marginBottom:"20px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px"}}>
                {
                  data.edit ?
                  <button onClick={()=>{UpdateAddress()}} type="submit" className="save-Changes">{t("SaveChanges")}</button>:
                  <button onClick={()=>{CreateNewAddress()}} type="submit" className="save-Changes">Create new address</button>
                }
              </div>
            </div>
            </Popup>
          )
          }
        </div>
    </div>

  );
}