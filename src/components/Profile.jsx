import { useState, useEffect } from "react";
import axios from 'axios';
const baseurl = import.meta.env.REACT_APP_API_BASE_URL;
function Profile(){
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    useEffect(()=>{
        var userData = JSON.parse(localStorage.userData);
        var token = userData.access_token
        var config = {
            method: 'get',
            url: `${baseurl}/api/profile`,
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            },
            data:{}
        };
        axios(config)
        .then((response) => {
            setEmail(response.data.email);
            if(response.data.name)
            {
                setName(response.data.name)
            }
           
        })
        .catch((error)=>{
        }) 
    },[])

    const handleSubmit = (e)=>{
        if(name==="")
        {
            return
        }
        var userData = JSON.parse(localStorage.userData);
        var token = userData.access_token
        var data = JSON.stringify({"name":name});
        var config = {
          method: 'POST',
          url: `${baseurl}/api/profile`,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          data : data
        };
        axios(config)
        .then(async (response)=>{
            setError("Your name has been updated!")
            setAlertmodal(true);
        })
        .catch((error)=>{
            setError("Error!")
            setAlertmodal(true);
        });
    }
    
    return(
        <main >
            <header>
                <h2>Profile</h2>
            </header>
            <section className="container" >
                <div className="input-box">
                    <label htmlFor="">Email</label>
                    <p>{email}</p>
                </div>
                <div className="input-box">
                    <label htmlFor="">Name</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <button className="yellow-btn" onClick={handleSubmit}>
                    <img src="/assets/img/icon_signin.png" alt="" />
                    <span>Change</span>
                </button>
            </section>
        </main>
    )
}

export default Profile;