'use client'
import { useContext, useEffect } from "react";
import { useAuth, AuthProvider, AuthContext } from "../../providers/UserSessionProvider";
import { createClient } from "../../../utils/supabase/client";
export default function MyAccount() {
  // const {user}  = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
        {
          user &&
          <>
            <div style={{display:"flex", gap:"10px", alignItems:"center",padding:"10px 0px", borderBottom:"1px solid #708d97"}}>
                <h3>Account details</h3>
                <svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg"  width="14" height="14" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </div>
            <div style={{display:"flex", gap:"10px", padding:"10px", alignItems:"center"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 21" fill="none">
                  <path d="M11.25 5C11.25 6.79493 9.79493 8.25 8 8.25V9.75C10.6234 9.75 12.75 7.62335 12.75 5H11.25ZM8 8.25C6.20507 8.25 4.75 6.79493 4.75 5H3.25C3.25 7.62335 5.37665 9.75 8 9.75V8.25ZM4.75 5C4.75 3.20507 6.20507 1.75 8 1.75V0.25C5.37665 0.25 3.25 2.37665 3.25 5H4.75ZM8 1.75C9.79493 1.75 11.25 3.20507 11.25 5H12.75C12.75 2.37665 10.6234 0.25 8 0.25V1.75ZM5 12.75H11V11.25H5V12.75ZM11 19.25H5V20.75H11V19.25ZM5 19.25C3.20507 19.25 1.75 17.7949 1.75 16H0.25C0.25 18.6234 2.37665 20.75 5 20.75V19.25ZM14.25 16C14.25 17.7949 12.7949 19.25 11 19.25V20.75C13.6234 20.75 15.75 18.6234 15.75 16H14.25ZM11 12.75C12.7949 12.75 14.25 14.2051 14.25 16H15.75C15.75 13.3766 13.6234 11.25 11 11.25V12.75ZM5 11.25C2.37665 11.25 0.25 13.3766 0.25 16H1.75C1.75 14.2051 3.20507 12.75 5 12.75V11.25Z" fill="#111111"></path>
              </svg>
              <span>Giorgi Andriandze</span>
            </div>
            <div style={{display:"flex", gap:"10px", padding:"10px", alignItems:"center"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 22 20" fill="none">
                    <path d="M1.60805 3.64824C1 4.93577 1 6.77405 1 10C1 13.7497 1 15.6246 1.95491 16.9389C2.26331 17.3634 2.6366 17.7367 3.06107 18.0451C4.3754 19 6.25027 19 10 19H12C15.7497 19 17.6246 19 18.9389 18.0451C19.3634 17.7367 19.7367 17.3634 20.0451 16.9389C21 15.6246 21 13.7497 21 10C21 6.75125 21 4.90985 20.379 3.62103M1.60805 3.64824C1.70677 3.4392 1.82153 3.24467 1.95491 3.06107C2.26331 2.6366 2.6366 2.26331 3.06107 1.95491C4.3754 1 6.25027 1 10 1H12C15.7497 1 17.6246 1 18.9389 1.95491C19.3634 2.26331 19.7367 2.6366 20.0451 3.06107C20.1727 3.23667 20.2832 3.42228 20.379 3.62103M1.60805 3.64824L2 4L3.92893 5.92893C7.26227 9.26227 8.92893 10.9289 11 10.9289C13.0711 10.9289 14.7377 9.26227 18.0711 5.92894L20 4L20.379 3.62103" stroke="#272829" strokeWidth="1.5"></path>
                </svg>
              <span>{user.email}</span>
            </div>
            <div style={{display:"flex", gap:"10px", padding:"10px", alignItems:"center"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
              <span>593 000 000</span>
            </div>
          </>
        }
    </>
  );
}