import React from 'react'
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom'
import './less/login.less'
import logoImg from '../assets/logo.png'
import { LoginApi } from '../request/api';


export default function Login() {

    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log('Success:', values);

        LoginApi({
            username: values.username,
            password: values.password
        }).then(res => {
            console.log(res)
            if(res.errCode === 0){
                message.success(res.message)
                //存储数据
                localStorage.setItem('avatar', res.data.avatar)
                localStorage.setItem('cms-token', res.data['cms-token'])
                localStorage.setItem('editable', res.data.editable)
                localStorage.setItem('player', res.data.player)
                localStorage.setItem('username', res.data.username)
                // 跳转
                setTimeout(() => {
                    navigate('/')
                },1500)
            }else{
                message.error(res.message)
            }
        })
    };


    return (
        <div className="login">
            
            <div className='login_box'>
                <img src={logoImg} alt="" />
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="请输入用户名" prefix={<UserOutlined className="site-form-item-icon" />} size='large' />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" size='large'/>
                    </Form.Item>

                    <Form.Item>
                        <Link to="/register">还没账户？立即注册</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block size='large'>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}