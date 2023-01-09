import React from 'react';
import {
    BellOutlined, ContactsFilled,
    DownOutlined,
    HomeFilled,
    SearchOutlined,
    SettingFilled,
    StarFilled,
    UserOutlined
} from '@ant-design/icons';
import {Button, Dropdown, message, Space, Tooltip} from 'antd';
import {NavLink, useNavigate} from "react-router-dom";

const items = [
    {
        label: '我的主页',
        key: '1',
        icon: <HomeFilled />
    },
    {
        label: '我的关注',
        key: '2',
        icon: <ContactsFilled />
    },
    {
        label: '我的收藏',
        key: '3',
        icon: <StarFilled />
    },
    {
        type:'divider'
    },
    {
        label: '设置',
        key: '4',
        icon: <SettingFilled />
    },
];
function App(props) {
    const navigate = useNavigate()
    const onClick = ({ key }) => {

        navigate('/setting')
    };
    return (
        <Dropdown
            menu={{
                items,
                onClick,
            }}
            arrow={{
                pointAtCenter: true,
            }}
            placement="bottom"
        >
            <Tooltip>
                <a onClick={(e) => e.preventDefault()}>
                    {props.children}
                </a>

            </Tooltip>
        </Dropdown>
    );
}
export default App;