import React,{useEffect, useState} from "react";
import { Menu } from 'antd';
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';
import { useNavigate,useLocation } from "react-router-dom";


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


const items = [
    getItem('获取文章列表list', 'listlist', <ReadOutlined />),
    getItem('获取文章列表table', 'listtable', <ReadOutlined />),
    getItem('文章编辑', 'edit', <EditOutlined />),
    getItem('修改资料', 'means', <DatabaseOutlined />),
];


export default function Asider() {
    const location = useLocation()
    const navigate = useNavigate()
    const [defaultkey, setdefaultkey] = useState("")

    useEffect(()=>{
        let path = location.pathname
        console.log(path.split('/')[1])
        setdefaultkey(path.split('/')[1])
    },[])
    const onClick = (e) => {
        setdefaultkey(e.key)
        navigate('/'+e.key)
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                width: 185,
            }}
            className="aside"
            selectedKeys={[defaultkey]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            items={items}
        />
    );
}