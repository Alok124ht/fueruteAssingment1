import React, { useState } from "react"
import "./homepage.css"
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Homepage = ({ }) => {
    let [store, setStore] = useState(localStorage.getItem("email"))

    const navigate = useNavigate()
    const handleLogout = () => {
        console.log("Logout Clicked");
        navigate('/')
        localStorage.setItem("email", null)
    }
    useEffect(() => {
        setStore(localStorage.getItem("email"))
        console.log(store);
    }, [])
    return (
        <div>
        {store !== "null" ?
            <div className="homepage">
                <h1>{store}</h1>
                <div className="button" onClick={handleLogout} >Logout</div>
                </div>
                :
                <div> please login first</div>
            
            }

    </div>
    )
}
export default Homepage

