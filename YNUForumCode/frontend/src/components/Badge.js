import React, { useState } from 'react';
import {BellOutlined, MinusOutlined, PlusOutlined, QuestionOutlined} from '@ant-design/icons';
import { Avatar, Badge, Button, Switch, Space } from 'antd';
const ButtonGroup = Button.Group;
const App = (props) => {
    const [show, setShow] = useState(true);
    const onChange = (checked) => {
        setShow(checked);
    };
    return (
        <Space direction="vertical">
            <Space size="large">
                <Badge count={props.msgNum}>
                    <Avatar shape="square" size="large" icon={<BellOutlined />}/>
                </Badge>
            </Space>
            {/*<Space size="large">
                <Badge dot={show}>
                    <Avatar shape="square" size="large" />
                </Badge>
                <Switch onChange={onChange} checked={show} />
            </Space>*/}
        </Space>
    );
};
export default App;