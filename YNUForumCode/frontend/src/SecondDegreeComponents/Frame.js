import React from 'react';
import {Avatar, Breadcrumb, Button, FloatButton, Image, Layout, Menu, theme} from 'antd';
import "../css/Frame.css"
import {
    BellOutlined,
    BellTwoTone,
    MailOutlined,
    PlusCircleTwoTone,
    PlusOutlined,
    UserOutlined
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import Badge from "../components/Badge";
import Dropdown from "../components/Dropdown";
import {Navigate, useNavigate} from "react-router-dom";

const {Header, Content, Footer} = Layout;

function isAuth() {
    return localStorage.getItem("token")
}

function Frame(props) {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const navigate = useNavigate()
    const handleOnClick = (e) => {
        if (e.key === '1') {
            navigate('/follow')
        }
        if (e.key === '2') {
            navigate('/hot')
        }
        if (e.key === '3') {
            navigate('/recommend')
        }
    }
    const onSearch = (value) => console.log(value)

    return (
        <Layout className="layout">
            <FloatButton shape="circle"
                         type="primary"
                         style={{
                             right: 54,
                             bottom: 100,
                             size:200
                         }}
                         onClick={()=>{
                             navigate('/newtopic')
                         }}
                         icon={<PlusOutlined  />}
                         tooltip={<div>发布一个新话题！</div>} />
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    padding: '0px 50px 0px 50px',
                    background: 'white'
                }}
            >
                <img className='Logo' style={{height: 60}} src={require('../assets/logo.png')} alt=""/>

                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={[props.type]}
                    style={{width: '20%', float: 'left'}}
                    onClick={(e) => {
                        handleOnClick(e)
                    }}
                    items={[
                        {key: 1, label: '关注'},
                        {key: 2, label: '热榜'},
                        {key: 3, label: '推荐'}
                    ]}
                />
                <Search
                    placeholder="input search text"
                    allowClear
                    onSearch={onSearch}
                    className='SearchBar'
                />

                <div style={{padding: '0px 20px 20px 0px', float: 'left'}}>
                    <Dropdown>
                        <Avatar shape="circle" style={{backgroundColor: 'transparent',}} size="large"
                                icon={<BellTwoTone/>}/>
                    </Dropdown>
                </div>

                <div>
                    {!isAuth() ?
                        <Avatar
                            style={{
                                backgroundColor: 'orange',
                                verticalAlign: 'middle',
                                cursor: 'pointer'
                            }}
                            size="large"
                            gap={1}
                            onClick={() => navigate('/login')}
                        >
                            {'登录'}
                        </Avatar>
                        :
                        <Dropdown>
                            <Avatar shape="square" size="large" icon={<UserOutlined/>}>
                                {'login'}
                            </Avatar>
                        </Dropdown>}
                </div>

            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                {props.children}
            </Content>


            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Copyright ©2023 Created by TIAN Yinxi
            </Footer>
        </Layout>
    );
}

export default Frame;