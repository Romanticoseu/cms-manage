import React,{useState,useEffect} from "react"
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation } from "react-router-dom";

export default function Bread() {
    const [breadName, setbreadName] = useState()
    const {pathname} = useLocation();

    useEffect(()=>{
        switch(pathname) {
            case "/listlist":
                setbreadName('查看文章列表list')
                break
            case "/listtable":
                setbreadName('查看文章列表table')
                break
            case "/edit":
                setbreadName('文章编辑')
                break
            case "/means":
                setbreadName('修改资料')
                break
            default:
                break
        }
    },[pathname]) 

    return (
        <Breadcrumb style={{height: "30px",lineHeight: "30px"}}>
            <Breadcrumb.Item href='/'>
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item >{breadName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}