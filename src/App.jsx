import React from "react";
import './assets/base.css'
import { Button } from 'antd';
import { Outlet } from "react-router-dom";

export default function App() {
    return(
        <>
            <Button type="primary">Primary Button</Button>

            <div>App</div>
            <Outlet />
        </>
        
    )
}