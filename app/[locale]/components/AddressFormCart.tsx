'use client'
import './style/AddressForm.css'
import { useAuth } from "../../providers/UserSessionProvider";
import {useTranslations, useLocale } from 'next-intl';
import { useAddressForm } from "../hooks/useAddressForm";
import { useEffect } from "react";
import Popup from './Popup';

export default function AddressFormCart({ setDeliveryAddress }: { setDeliveryAddress: React.Dispatch<React.SetStateAction<any>> }) {
  const { user } = useAuth();
  const t = useTranslations('MyAccount');
  const { emptyAddress , data, setData, checker, CreateNewAddress, UpdateAddress, DeleteAddress } = useAddressForm();
  useEffect(() => {
    if (data.deliveryAddress.length > 0) {
        setDeliveryAddress(data.deliveryAddress[0]);
    }
}, [data.deliveryAddress]); // Runs when deliveryAddress changes
  return (
      <div style={{display:"flex", gap:"20px"}}>
        <div style={{display:"flex",flexDirection:"column", gap:"10px", marginTop:"20px", alignItems:"center"}}>
            {
                data.deliveryAddress.length > 0 && data.deliveryAddress.map((address, index) => {
                return(
                    <div key={address.id}style={{display:"flex", gap:"10px"}}>
                        <input
                        defaultChecked={index === 0}
                        type='radio' name='address' value={index} onClick={() => setDeliveryAddress(address)} className='address-radio'></input>
                        <div className="address-Div" style={{display:"flex",flexDirection:"column", gap:"5px", textAlign:"center", padding:"0px 10px", transition:"all .5s ease-out",border:"1px solid #708d97",borderRadius:"6px", boxShadow:"0px 5px 5px rgba(155, 177, 207, 0.685)" }}>
                            <h4 style={{borderBottom:"1px solid #708d97"}}>{address.first_Name} {address.last_Name}</h4>
                            <div style={{display:"flex", gap:"5px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <div style={{display:"flex", gap:"10px"}}>
                                    <p>{address.city},</p>
                                    {
                                        address.region && <p>{address.region},</p>
                                    }
                                    <p>{address.street_Address},</p>
                                    <p>{address.apartment_Number},</p>
                                    <p style={{display:"flex",gap:"10px", alignItems:"center"}}>{t("PostalCode")} :{address.zip_Code}</p>
                                </div>
                            </div>
                            <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>{address.phone}
                            </div>
                            <div style={{display:"flex",gap:"10px", padding:"5px 0", alignItems:"center"}}>
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
            {
              data.deliveryAddress.length > 0 &&
                <button style={{width:"50%"}} className="add_new_address_cart" onClick={() => setData(prev => ({ ...prev, showPopup: true, edit:false }))}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span>Add Address</span>
              </button>
            }

        </div>
        {
          data.showPopup && (
          <Popup onClose={() => setData(prev => ({ ...prev,
          showPopup: false,
          address:emptyAddress }))}>
            <div style={{marginTop:"20px"}}>
              <div style={{marginBottom:"20px", display:"grid", gridTemplateColumns:"0.5fr 2fr 2fr", gap:"10px"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <div>
                  <label htmlFor="first_Name">{t("Name")}</label>
                    <input
                    className='input'
                    type="text"
                    placeholder={!checker.isFirstNameValid && t("Type") + " " + t("Name")}
                    style={{borderColor: !checker.isFirstNameValid && "red"}}
                    name="" id="first_Name" 
                    value={data.address.first_Name}
                    onChange={(e) => setData((prev) => ({
                      ...prev,
                      address: { ...prev.address, first_Name: e.target.value }
                    }))} />
                </div>
                <div>
                  <label htmlFor="last_Name">{t("LastName")}</label>
                    <input
                    className='input'
                    type="text"
                    placeholder={!checker.isLastNameValid && t("Type") + " " + t("LastName") }
                    style={{borderColor: !checker.isLastNameValid && "red"}}
                    name="" id="last_Name"
                    value={data.address.last_Name}
                    onChange={(e) => setData((prev) => ({
                      ...prev,
                      address: { ...prev.address, last_Name: e.target.value }
                    }))} />
                </div>
              </div>
              <div style={{marginBottom:"20px", display:"grid", gridTemplateColumns:"0.5fr  4fr", gap:"10px"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <div>
                  <label htmlFor="phone">{t("Phone")}</label>
                  <input
                  className='input'
                  type="phone"
                  placeholder={!checker.isPhoneValid && t("Type") + " " + t("Phone")}
                  style={{borderColor: !checker.isPhoneValid && "red"}}
                  name="" id="phone"
                  value={data.address.phone}
                  onChange={(e) => setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, phone: e.target.value }
                  }))} />
                </div>
              </div>

              <div style={{marginBottom:"20px", display:"grid", gridTemplateColumns:"0.5fr  4fr", gap:"10px"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                <div>
                  <div style={{marginBottom:"20px", display:"grid"}}>
                    <label>{t("StreetAddress")}</label>
                    <div>
                      <input
                      className='input'
                      type="text"
                      placeholder={!checker.isStreetAddressValid && t("Type") + " " + t("StreetAddress")}
                      style={{borderColor: !checker.isStreetAddressValid && "red"}}
                      name="" id="street_Address"
                      value={data.address.street_Address}
                      onChange={(e) => setData((prev) => ({
                        ...prev,
                        address: { ...prev.address, street_Address: e.target.value }
                      }))} />
                    </div>
                  </div>
                  <div style={{marginBottom:"10px",}}>
                    <label style={{fontSize:"12px"}} htmlFor="apartment_Number"> {t("buildingNumber")}</label>
                    <div>
                      <input
                      className='input'
                      type="text"
                      name="" id="apartment_Number"
                      value={data.address.apartment_Number}
                      onChange={(e) => setData((prev) => ({
                        ...prev,
                        address: { ...prev.address, apartment_Number: e.target.value }
                      }))}/>
                    </div>
                  </div>
                  <div style={{marginBottom:"10px",}}>
                    <label style={{fontSize:"12px"}} htmlFor="city">{t("City")}</label>
                    <div>
                      <input
                      className='input'
                      type="text"
                      placeholder={!checker.isCityValid && t("Type") + " " + t("City")}
                      style={{borderColor: !checker.isCityValid && "red"}}
                      name="" id="city"
                      value={data.address.city}
                      onChange={(e) => setData((prev) => ({
                        ...prev,
                        address: { ...prev.address, city: e.target.value }
                      }))}/>
                    </div>
                  </div>
                  <div style={{marginBottom:"10px",}}>
                    <label style={{fontSize:"12px"}} htmlFor="zip_Code">{t("PostalCode")}</label>
                    <div>
                      <input
                      className='input'
                      type="text"
                      placeholder={!checker.isZipCodeValid && t("Type") + " " + t("PostalCode")}
                      style={{borderColor: !checker.isZipCodeValid && "red"}}
                      name="" id="zip_Code"
                      value={data.address.zip_Code}
                      onChange={(e) => setData((prev) => ({
                        ...prev,
                        address: { ...prev.address, zip_Code: e.target.value }
                      }))}/>
                    </div>
                  </div>
                  <div style={{marginBottom:"10px",}}>
                    <label style={{fontSize:"12px"}} htmlFor="region">{t("Region")+"/"+t("Municipality")}</label>
                    <div>
                      <input
                      className='input'
                      type="text"
                      name="" id="region"
                      value={data.address.region}
                      onChange={(e) => setData((prev) => ({
                        ...prev,
                        address: { ...prev.address, region: e.target.value }
                      }))} />
                    </div>
                  </div>
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
  );
}