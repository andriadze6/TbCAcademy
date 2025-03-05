"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../providers/UserSessionProvider";
import { supabase } from "../../../utils/supabase/client";
import { DeliveryAddressType } from "../../Type/type";

export function useAddressForm() {
  const { user } = useAuth();

  const emptyAddress: DeliveryAddressType = {
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
  };

  const [checker, setChecker] = useState({
    isFirstNameValid: true,
    isLastNameValid: true,
    isPhoneValid: true,
    isCityValid: true,
    isStreetAddressValid: true,
    isApartmentNumberValid: true,
    isZipCodeValid: true,
  });

  const [data, setData] = useState<{
    deliveryAddress: DeliveryAddressType[];
    showPopup: boolean;
    address: DeliveryAddressType;
    edit: boolean;
  }>({
    deliveryAddress: [],
    showPopup: false,
    address: emptyAddress,
    edit: false,
  });

  const fetchDeliveryAddress = useCallback(async () => {
    if (!user) return;
    try {
      const response = await fetch("/api/DeliveryAddress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID: user.id }),
      });

      if (!response.ok) throw new Error("Failed to fetch delivery address");

      const fetchedData = await response.json();
      setData((prev) => ({
        ...prev,
        deliveryAddress: fetchedData,
        showPopup: false,
        address: emptyAddress,
        edit: false,
      }));
    } catch (error) {
      console.error("Error fetching delivery address:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchDeliveryAddress();
  }, [user, fetchDeliveryAddress]);

  useEffect(() => {
    if (!user) return;
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
        () => fetchDeliveryAddress()
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user, fetchDeliveryAddress]);

  function checkInputs(first_Name, last_Name, phone, city, street_Address, apartment_Number, zip_Code) {
    debugger
    const newChecker = {
      isFirstNameValid: first_Name.trim() !== "",
      isLastNameValid: last_Name.trim() !== "",
      isPhoneValid: phone.trim() !== "",
      isCityValid: city.trim() !== "",
      isStreetAddressValid: street_Address.trim() !== "",
      isApartmentNumberValid: apartment_Number.trim() !== "",
      isZipCodeValid: zip_Code.trim() !== "",
    };

    setChecker(newChecker);
    return Object.values(newChecker).every(Boolean);
  }

  async function CreateNewAddress() {
    if (!user) return;
    debugger
    const formData = new FormData();
    Object.entries(data.address).forEach(([key, value]) => formData.append(key, value.toString()));
    formData.append("userID", user.id);
    if (checkInputs(data.address.first_Name, data.address.last_Name, data.address.phone, data.address.city, data.address.street_Address, data.address.apartment_Number, data.address.zip_Code)) {
      const response = await fetch("/api/CreateAddress", {
        method: "POST",
        body: formData,
      });
      if (response.ok) fetchDeliveryAddress();
    }
  }

  async function UpdateAddress() {
    if (!user || !data.edit) return;

    const existingAddress = data.deliveryAddress.find((addr) => addr.id === data.address.id);
    if (existingAddress && JSON.stringify(existingAddress) !== JSON.stringify(data.address)) {
      const response = await fetch("/api/UpdateAddress", {
        method: "POST",
        body: JSON.stringify(data.address),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) fetchDeliveryAddress();
    }
  }

  async function DeleteAddress(ID: string) {
    const response = await fetch("/api/DeleteAddress", {
      method: "POST",
      body: JSON.stringify({ ID }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) fetchDeliveryAddress();
  }

  return {
    emptyAddress,
    data,
    setData,
    checker,
    setChecker,
    CreateNewAddress,
    UpdateAddress,
    DeleteAddress,
  };
}
