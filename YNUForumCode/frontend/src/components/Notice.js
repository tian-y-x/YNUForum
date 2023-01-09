import React from 'react';
import {
    BorderBottomOutlined,
    BorderTopOutlined,
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
} from '@ant-design/icons';
import { Button, Divider, notification, Space } from 'antd';
const App = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.info({
            message: `Notification ${placement}`,
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            placement,
        });
    };
    return (
        <>
            {contextHolder}

            <Space>
                <Button

                    type="primary"
                    onClick={() => openNotification('topLeft')}
                    icon={<RadiusUpleftOutlined />}
                >
                    topLeft
                </Button>
            </Space>

        </>
    );
};
export default App;