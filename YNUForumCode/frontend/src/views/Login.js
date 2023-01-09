import React, {useContext, useEffect, useState} from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Alert, Button, Card, Checkbox, Form, Input, notification, message} from 'antd';
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import Notice from "../components/Notice";
import {GlobalContext} from "../routers/AppRouters"

const App = (props) => {
    const Navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [info,setInfo] = useState({name:'',pwd:''})
    const value = useContext(GlobalContext)
    const error = () => {
        messageApi.open({
            type: 'error',
            content: '用户名或密码错误！请检查输入',
        });
    };
    function handleOnClick() {
        if(info.name===''||info.pwd==='')
            return
        axios({
            method:'post',
            url:`http://localhost:3333/login`,
            data:{
                name:info.name,
                pwd:info.pwd
            }
        }).then(res=>{
            let t = res.data
            if (t) {
                localStorage.setItem('token', info.name)
                Navigate('/hot')
            }else{
                error()
            }
        })


    }
    //console.log(value)
    return <div style={{position: 'absolute',left:300,top:50,height:200}}>
        {contextHolder}
        <Card title="登录" hoverable style={{width: 1000, height: 500}}>
            <div style={{
                width: '30%', height: 150,
                top: 90, left: 350,
                position: 'absolute'
            }}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input
                            onChange={(evt)=>{
                                setInfo({name:evt.target.value,pwd:info.pwd})
                                value.changeUser(evt.target.value)
                            }}
                            prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            onChange={(evt)=>{
                                setInfo({name:info.name,pwd:evt.target.value})

                            }}
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                                onClick={()=>handleOnClick()}>
                            登录！
                        </Button>
                        <div style={{paddingTop:20}}>Or <a href="/register">register now!</a></div>

                    </Form.Item>
                </Form>
            </div>
        </Card>
    </div>
};
export default App;