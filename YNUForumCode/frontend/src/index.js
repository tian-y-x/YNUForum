import React, {useState} from "react";
import { createRoot } from "react-dom/client";
import {Button, Image} from "antd";
import 'antd/dist/reset.css';
import Frame from "./SecondDegreeComponents/Frame"
import Badge from"./components/Badge"
import Dropdown from "./components/Dropdown";
import Topic from "./SecondDegreeComponents/Topic";
import HotTopic from "./views/HotTopic";
import {BrowserRouter} from 'react-router-dom'
import {AppRouters} from "./routers/AppRouters";
import 'core-js/es'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'


const App = () => {
    return (
        <BrowserRouter>
            <AppRouters/>
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);