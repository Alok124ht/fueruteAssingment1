import { useState } from 'react';
import './App.css';
import Login from './component/login/login';
import Welcome from "./component/homepage/homepage"
import Error from './component/protected/Error';
import {BrowserRouter,Routes,Route} from "react-router-dom";





function App() {
  let [token, setToken]= useState(localStorage.getItem("email"))
//   let isLoggedIn = localStorage.getItem("isLoginUser")
// console.log(isLoggedIn, "isLoggedIn");

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login/>} />    
					{	token==="null" && <Route  path="/" element={<Login/>} />}
					 <Route  path="/welcome" element={<Welcome/>} />				
      <Route path="*" element={<Error/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;