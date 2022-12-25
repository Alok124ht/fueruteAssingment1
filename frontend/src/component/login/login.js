import React, { useState } from "react";
import "./login.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const handleChange = function (event) {
        let fieldValue = event.target.value
        let fieldName = event.target.name
        console.log(fieldName, fieldValue);

        setData({
            ...data,
            [fieldName]: fieldValue
        })
    }
    const navigate = useNavigate()
    const [counter, setCounter] = useState(0)

    const handle = async (event) => {
        try {
            const time = new Date().getTime()
            localStorage.setItem("usernow", time)

            if ((localStorage.getItem("userkal") - localStorage.getItem("usernow")) > 0) {
                console.log(localStorage.getItem("userkal"));
                alert("you are blocked")
                localStorage.setItem("diff", localStorage.getItem("userkal") - localStorage.getItem("usernow"))
            }
            else {
                // localStorage.setItem("diff",0)
                if (counter != 5) {
                    console.log("data")
                    localStorage.removeItem("diff")
                    localStorage.removeItem("userkal")
                    localStorage.removeItem("usernow")

                    event.preventDefault()

                    let res = await axios.post("http://localhost:3001/login", {
                        email: data.email,
                        password: data.password,
                    })

                    console.log(res, "res")

                    localStorage.setItem("email", data.email);

                    alert("login successful redirect into welcome page")

                    navigate("/welcome")


                }

                else {
                    const current = new Date();

                    var yesterday = new Date().getTime() + (24 * 60 * 60 * 1000)

                    localStorage.setItem("userkal", yesterday)
                    localStorage.setItem("diff", localStorage.getItem("userkal") - localStorage.getItem("usernow"))
                    setCounter(counter - 5)
                    console.log(counter);
                    alert("you are blocked")
                }
            }
        }
        catch (err) {
            alert("invalid email and password")
            setCounter(counter + 1)


            console.log(counter);
        }
    }
    return (
        <div className="login">

            <h1>Login</h1>
            <input type="text" name="email" required value={data.email} placeholder="Enter Email" onChange={handleChange} ></input>
            <input type="password" name="password" value={data.password} placeholder="Enter password" onChange={handleChange} required></input>
            <input className="button" onClick={handle} type="submit" />
        </div>
    )
}
export default Login




// z
// console.log(decodeURI('1234surya-name4321&42-age1234&male-gender4321')
//   .split('&')
//   .replace(/1/g,'","') 
//   .reduce((result, current) => {
//     const [key, value] = current.split('-');

//     result[value] = key;

//     return result
//   }, {}))

// let input="1234surya-name4321&42-age1234&male-gender4321"

// let ans= input.replace(/1234/g, '\ ').replace(/4321/g, '\ ').split("&")
// console.log(ans);
// let res= ans.reduce((result,current)=>{
// const [key,value]= current.split("-")
// result[value]= key
// return result
// },{})
// console.log(res);

// output: { 'name ': ' surya', 'age ': '42', 'gender ': 'male' }