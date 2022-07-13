import { useState, useEffect } from "react";
import axios from 'axios';
const baseurl = import.meta.env.REACT_APP_API_BASE_URL;
function UserInfo(){
    const [totalInfo, setTotalInfo] = useState({});
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        var userData = JSON.parse(localStorage.userData);
        var token = userData.access_token
        var config = {
            method: 'get',
            url: `${baseurl}/api/siteInfo`,
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            },
            data:{}
        };
        axios(config)
        .then((response) => {
            setTotalInfo(response.data)
        })
        .catch((error)=>{
        })

        var config = {
            method: 'get',
            url: `${baseurl}/api/users`,
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            },
            data:{}
        };
        axios(config)
        .then((response) => {
            setUsers(response.data.users)
        })
        .catch((error)=>{
        }) 
    },[])


    
    return(
        <main >
            <header>
                <h2>User Information</h2>
            </header>
            <section className="container userinfo" >
                <div className="input-box">
                    <label htmlFor="">Total users</label>
                    <p>{totalInfo.user_number}</p>
                    <label htmlFor="">Average visitor number(Last 7 days)</label>
                    <p>{totalInfo.user_number_lastweek_average}</p>
                    <label htmlFor="">Today visitor number</label>
                    <p>{totalInfo.user_number_today}</p>
                </div>
                <div >
                    <table>
                        <thead>
                            <tr>
                                <td width="100px">User<br/> Name</td>
                                <td width="100px">User<br/> Email</td>
                                <td width="100px">Signup <br/> Time</td>
                                <td width="100px">Access <br/> Time</td>
                                <td width="100px">Last <br/> Access</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item,index)=>(
                                 <tr key={index}>
                                    <td width="100px">{item.username}</td>
                                    <td width="100px">{item.email}</td>
                                    <td width="100px">{item.created_at?.substring(0,10)}</td>
                                    <td width="100px">{item.login_number}</td>
                                    <td width="100px">{item.last_login?.substring(0,10)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}

export default UserInfo;