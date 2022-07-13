import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import Profile from './Profile';
import UserInfo from './UserInfo';
function Top(){
    const navigate = useNavigate()
    const [activeTab, setactiveTab] = useState(1)
    const [is_admin, setAdmin] = useState(false)

   
    useEffect(()=>{
        let userData = JSON.parse(localStorage.userData);
        setAdmin(userData.is_superuser)
    },)
    const handleLogout = (event)=>{
        localStorage.removeItem("userData");
        window.location.assign('/signin');
    }
    return(
        <>
            <div className="header">
                <div className="header-img">
                     <img onClick={(e) => this.upload.click() } src="/assets/img/avatar.jpg" alt="" />
                </div>
            </div>
            <Routes>
                <Route  path='/' element={<ResetPassword/>} />
                <Route  path='profile' element={<Profile/>} /> 
                <Route path="/userinfo" element={is_admin ? <UserInfo/>:<Navigate to="/dashboard" replace/>} />     
            </Routes>
            <menu>
                <nav>
                    <ul className="menu-sp">
                        <li><a onClick={()=>{navigate("/dashboard"); setactiveTab(1)}}>                                
                                <div>
                                    <img src="/assets/img/icon_menu01.png" alt="" />
                                    <img src="/assets/img/icon_menu01_active.png" alt="" />
                                </div>
                                <span>ResetPassword</span>
                            </a>
                        </li>
                       
                        <li>
                            <a onClick={()=>{navigate("/dashboard/profile"); setactiveTab(2)}}>
                                <div>
                                    <img src="/assets/img/icon_menu03.png" alt="" />
                                    <img src="/assets/img/icon_menu03_active.png" alt="" />
                                </div>
                                <span>Profile</span>
                            </a>
                        </li>
                        {
                            is_admin && <li>
                            <a onClick={()=>{navigate("/dashboard/userinfo"); setactiveTab(3)}}>
                                    <div>
                                        <img src="/assets/img/icon_menu03.png" alt="" />
                                        <img src="/assets/img/icon_menu03_active.png" alt="" />
                                    </div>
                                    <span>UserInfo</span>
                                </a>
                            </li>
                        }
                        
                        
                    </ul>
                    <ul className="menu-pc">
                        <li>
                            <a onClick={()=>{navigate("/dashboard"); setactiveTab(1)}} className={activeTab==1 ? "current-page" : ""}>
                                <div>
                                    <img src="/assets/img/icon_menu01.png" alt="" />
                                    <img src="/assets/img/icon_menu01_active.png" alt="" />
                                </div>
                                <span>ResetPassword</span>
                            </a>
                        </li>
                       
                        <li>
                            <a onClick={()=>{navigate("/dashboard/profile"); setactiveTab(2)}} className={activeTab==2 ? "current-page" : ""}>
                                <div>
                                    <img src="/assets/img/icon_menu03.png" alt="" />
                                    <img src="/assets/img/icon_menu03_active.png" alt="" />
                                </div>
                                <span>Profile</span>
                            </a>
                        </li>
                        {
                            is_admin && <li>
                            <a onClick={()=>{navigate("/dashboard/userinfo"); setactiveTab(3)}} className={activeTab==3 ? "current-page" : ""}>
                                <div>
                                    <img src="/assets/img/icon_menu03.png" alt="" />
                                    <img src="/assets/img/icon_menu03_active.png" alt="" />
                                </div>
                                <span>UserInfo</span>
                            </a>
                        </li>
                        }
                    </ul>
                </nav>
                <a onClick={handleLogout} className="logout-pc">Logout</a>
            </menu>
        </>
    )
}

export default Top;