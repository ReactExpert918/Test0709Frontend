import { useState, useEffect } from "react";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const baseurl = import.meta.env.REACT_APP_API_BASE_URL;

function Signup(){
    const navigate = useNavigate()
    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: "312428630935-stnl6e198vg30cbv9q8vg0hj48vhruva.apps.googleusercontent.com",
            scope: 'email',
          });
        }
    
        gapi.load('client:auth2', start);
      }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [alertmodal, setAlertmodal] = useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(password!==passwordConfirm){
            setError("Password is incorrect!")
            setAlertmodal(true);
            return;
        }
        let passwordRegax = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        if(!passwordRegax.test(password)){
            setError("Password is weak!")
            setAlertmodal(true);
            return;
        }

        var data = JSON.stringify({"email":email,"password":password});
        var config = {
            method: 'POST',
            url: `${baseurl}/api/signup`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          axios(config)
          .then(async (response)=>{
            setError("You have registered")
            setAlertmodal(true);
          })
          .catch((error)=>{
            setError("This email address is already exist!")
            setAlertmodal(true);
          });

    }

    const responseFacebook = async (response) => {
        console.log(response);
      }
  
    const responseGoogle = (response) => {

        axios.post(
            `${baseurl}/api/googlesign`,
            {
              access_token: response.accessToken,
            }
          ).then((response)=>{    
            localStorage.setItem("userData", JSON.stringify(response.data))
            window.location.assign("/dashboard");
          })
    }
    return(
        <>
          
            <main id="login">
                <header>
                    <h2>Login</h2>
                </header>
                <form onSubmit={handleSubmit}>
                <section className="container">
                    <div className="input-box">
                        <label htmlFor="">Email</label>
                        <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Password</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Password Confirm</label>
                        <input type="password" value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)}/>
                    </div>
                    <button className="yellow-btn" >
                        <img src="/assets/img/icon_signin.png" alt="" />
                        <span>Sign up</span>
                    </button>
                    <a className="yellow-btn" onClick={()=>{navigate("/signin")}}>
                        <img src="/assets/img/icon_signin.png" alt="" />
                        <span>Sign in</span>
                    </a>
                    <br/>
                    <FacebookLogin
                        appId="<FACEBOOK APP ID>"
                        fields="name,email,picture"
                        callback={responseFacebook}
                    />
                    <br />
                    <GoogleLogin
                        clientId="312428630935-stnl6e198vg30cbv9q8vg0hj48vhruva.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />
                </section>
                </form>
            </main>
            <div className={alertmodal?"modal modal-show":"modal"} onClick={(e)=>{setAlertmodal(false)}}>
                <div className="modal-body" onClick={(e)=>{e.stopPropagation()}}>
                    <p>{error}</p>
                </div>
            </div>
        </>
    )
}

export default Signup;