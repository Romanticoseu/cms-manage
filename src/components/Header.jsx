import React,{useState, useEffect} from "react";
import logoImg from '../assets/logo.png'
import { Menu, Dropdown, Space, Divider, message } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import defaultAvatar from '../assets/defaultAvatar.png'

export default function Header() {
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [username, setUsername] = useState('游客')

    useEffect(()=>{
        let username1 = localStorage.getItem('username')
        let avatar1 = 'http://47.93.114.103:6688/'+localStorage.getItem('avatar')
        if(username1){
            setUsername(username1)
        }
        if(avatar1){
            setAvatar(avatar1)
        }
    },[])

    const logout = () => {
        localStorage.clear()            //清楚数据
        message.success('退出成功，即将返回登陆页')
        setTimeout(()=>{navigate('/login')},1500)
    }

    const menu = (
        <Menu
            items={[
                {
                    label: (
                        '修改资料'
                    ),
                },
                {
                    type: Divider
                },
                {   
                    label:(
                        <span onClick={logout}>退出登录</span>    
                    )
                    
                },
            ]}
        />
    );

    return(
        <header>
            <img src={logoImg} alt="" className="logo" />
            <div className="right">
                <Dropdown overlay={menu}>
                    <a onClick={e => e.preventDefault()} className="dropdown" >
                        <Space>
                            <img src={avatar} alt="" className="avatar" />
                            <span>{username}</span>
                            <CaretDownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}