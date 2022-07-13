import { useState } from "react";
import axios from "axios";
const baseurl = import.meta.env.REACT_APP_API_BASE_URL;
function ResetPassword(){
    
    const[oldPassword,setOldpassword] = useState("");
    const[newpassword, setNewPassword] = useState("");
    const[newpasswordConfirm, setNewPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [alertmodal, setAlertmodal] = useState(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(newpassword==="" || oldPassword==="")
        {
            return
        }
        if(newpassword!==newpasswordConfirm){
            setError("Password is incorrect!")
            setAlertmodal(true);
            return;
        }
        let passwordRegax = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        if(!passwordRegax.test(newpassword)){
            setError("Password is weak!")
            setAlertmodal(true);
            return;
        }
        var userData = JSON.parse(localStorage.userData);
        var token = userData.access_token
        var data = JSON.stringify({"oldpassword":oldPassword,"newpassword":newpassword});
        var config = {
          method: 'POST',
          url: `${baseurl}/api/resetPassword`,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          data : data
        };
        axios(config)
        .then(async (response)=>{
            setError("Your password has been updated!")
            setAlertmodal(true);
        })
        .catch((error)=>{
            setError("Your old password is not correct!")
            setAlertmodal(true);
        });

    }
    return(
        
            <main id="login">
                <header>
                    <h2>ReSetPassword</h2>
                </header>
                <form onSubmit={handleSubmit}>
                    <section className="container">
                        <div className="input-box">
                            <label htmlFor="">Old Password</label>
                            <input type="password"  value={oldPassword} onChange={(e)=>setOldpassword(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="">New Password</label>
                            <input type="password" value={newpassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                        </div>
                        <div className="input-box">
                            <label htmlFor="">New Password Confirm</label>
                            <input type="password" value={newpasswordConfirm} onChange={(e)=>setNewPasswordConfirm(e.target.value)}/>
                        </div>
                        <button className="yellow-btn" >
                            <img src="/assets/img/icon_signin.png" alt="" />
                            <span>Change</span>
                        </button>
                    </section>
                </form>
                <div className={alertmodal?"modal modal-show":"modal"} onClick={(e)=>{setAlertmodal(false)}}>
                    <div className="modal-body" onClick={(e)=>{e.stopPropagation()}}>
                        <p>{error}</p>
                    </div>
                </div>
            </main>
            
    )
}

export default ResetPassword;