import { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
const baseurl = import.meta.env.REACT_APP_API_BASE_URL;

function EmailVerify() {
    let {token} = useParams();
    const naviate = useNavigate();
    useEffect(()=>{
        var config = {
            method: 'get',
            url: `${baseurl}/api/emailverify?token=${token}`,
            headers: { 
            'Content-Type': 'application/json',
            },
            data:{}
        };
        axios(config)
        .then((response) => {
            naviate("/signin")
        })
        .catch((error)=>{
            naviate("/signin")
        }) 
    })
}


export default EmailVerify;