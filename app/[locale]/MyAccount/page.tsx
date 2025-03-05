
import  AddressFrom from '../components/AddressForm';
export default function MyAccount() {
  return (
    <div>
        <div style={{display:"flex", gap:"10px", alignItems:"center",padding:"10px 0px", borderBottom:"1px solid #708d97"}}>
          <h3>Account details</h3>
        </div>
        <AddressFrom></AddressFrom>
    </div>
  );
}