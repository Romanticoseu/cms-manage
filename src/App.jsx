import React from "react";
import './assets/base.less'
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import Header from "./components/Header";
import Asider from "./components/Asider";
import Bread from "./components/Bread"

export default function App() {
    return(
        <div id="app">
            <Header/>
            <div className="container">
                <Asider />
                <div className="container_box">
                    <Bread />
                    <div className="container_content">
                        <Outlet />
                    </div>
                </div>
            </div>
            <footer>东南大学</footer>
        </div>
    )
}