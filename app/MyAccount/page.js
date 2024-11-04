import '../assets/css/myAccount.css';
import MyAccountManue from '../components/MyAccountManue';

function MyAccount(){
    return(
        <>
            <div className="myAccount-Div">
                <MyAccountManue></MyAccountManue>
                <div id="address">
                <p>Address and contact information</p>
                <h4 className="billing-address">Billing address</h4>
                <address className="address">
                    <div className="address-Div">
                        <div>
                            <label>Name</label>
                            <input className="Address_input"/>
                        </div>
                        <div>
                            <label>Last name</label>
                            <input className="Address_input"/>
                        </div>
                    </div>
                    <div className="address-Div">
                        <div>
                            <label>Addres</label>
                            <input className="Address_input"/>
                        </div>
                    </div>
                    <div className="address-Div">
                        <div>
                            <label>City</label>
                            <input className="Address_input"/>
                        </div>
                        <div>
                            <label>Date of birth</label>
                            <input type="date" className="Address_input"/>
                        </div>
                    </div>
                    <div className="address-Div">
                        <div>
                            <label>Email</label>
                            <input type="number" className="Address_input"/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="number" className="Address_input"/>
                        </div>
                    </div>
                    <div className="address-Div">
                        <div>
                            <label>Telphone 1</label>
                            <input type="number" className="Address_input"/>
                        </div>
                        <div>
                            <label>Telphone 2</label>
                            <input type="number" className="Address_input"/>
                        </div>
                    </div>
                </address>
            </div>
            </div>
        </>

    )
}
export default MyAccount;