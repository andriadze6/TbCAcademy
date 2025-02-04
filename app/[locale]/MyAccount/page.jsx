'use client'
import { useContext, useEffect } from "react";
import { useAuth, AuthProvider, AuthContext } from "../../providers/UserSessionProvider";
import { createClient } from "../../../utils/supabase/client";
export default function MyAccount() {
  // const {user}  = useContext(AuthContext);
  // const { user} = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      const { data: data1, error: error1 } = await supabase.auth.getSession()

      debugger
      // console.log(data);
    };
    fetchUser();
  },[]);
  return (
    <>
      <h3>Account details</h3>
      <div style={{display:"flex", gap:"10px"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 21" fill="none">
            <path d="M11.25 5C11.25 6.79493 9.79493 8.25 8 8.25V9.75C10.6234 9.75 12.75 7.62335 12.75 5H11.25ZM8 8.25C6.20507 8.25 4.75 6.79493 4.75 5H3.25C3.25 7.62335 5.37665 9.75 8 9.75V8.25ZM4.75 5C4.75 3.20507 6.20507 1.75 8 1.75V0.25C5.37665 0.25 3.25 2.37665 3.25 5H4.75ZM8 1.75C9.79493 1.75 11.25 3.20507 11.25 5H12.75C12.75 2.37665 10.6234 0.25 8 0.25V1.75ZM5 12.75H11V11.25H5V12.75ZM11 19.25H5V20.75H11V19.25ZM5 19.25C3.20507 19.25 1.75 17.7949 1.75 16H0.25C0.25 18.6234 2.37665 20.75 5 20.75V19.25ZM14.25 16C14.25 17.7949 12.7949 19.25 11 19.25V20.75C13.6234 20.75 15.75 18.6234 15.75 16H14.25ZM11 12.75C12.7949 12.75 14.25 14.2051 14.25 16H15.75C15.75 13.3766 13.6234 11.25 11 11.25V12.75ZM5 11.25C2.37665 11.25 0.25 13.3766 0.25 16H1.75C1.75 14.2051 3.20507 12.75 5 12.75V11.25Z" fill="#111111"></path>
        </svg>
        <span>Giorgi Andriandze</span>
      </div>
    </>
  );
}