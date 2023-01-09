import React, {useState} from 'react';
import HotTopic from "../views/HotTopic";
import Follow from "../views/Follow";
import {Route, Routes, Navigate} from "react-router-dom";
import Settings from "../views/Settings";
import NewTopic from "../views/NewTopic";
import Register from "../views/Register";
import Login from "../views/Login";
import Channel from "../views/Channel";
import Recommend from "../views/Recommend";


function isAuth(){
    return localStorage.getItem("token")
}
const GlobalContext = React.createContext()
function AppRouters(props) {
    let current_name = ""
    if(isAuth())
        current_name = isAuth()
    const [user,setUser] = useState(current_name)

    return (
        <GlobalContext.Provider value={{n:user,changeUser:(value)=>{{setUser(value)}}}}>
        <Routes>
            <Route index element={<HotTopic></HotTopic>}></Route>
            <Route path={"/hot"} element={<HotTopic></HotTopic>}></Route>
            <Route path={"/follow"} element={<Follow></Follow>}></Route>
            <Route path={"/setting"} element={isAuth()?<Settings></Settings>:<Navigate to={'/login'}/>}></Route>
            <Route path={"/newtopic"} element={<NewTopic></NewTopic>}></Route>
            <Route path={"/login"} element={<Login></Login>}></Route>
            <Route path={"/register"} element={<Register></Register>}></Route>
            <Route path={"/channel/:myid"} element={<Channel></Channel>}></Route>
            <Route path={"/recommend"} element={<Recommend></Recommend>}></Route>
        </Routes>
        </GlobalContext.Provider>
    );
}
export {GlobalContext,AppRouters}