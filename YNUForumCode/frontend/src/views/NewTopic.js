import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload,
    message
} from 'antd';
import axios from "axios";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FormDisabledDemo = () => {
    const [componentDisabled, setComponentDisabled] = useState(false);
    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
    };
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '发布成功！',
        });
    };
    const [info,setInfo] = useState({title:'',content:'',picture:''})
    function handleOnClick() {
        axios({
            method:'post',
            url:`http://localhost:3333/newtopic`,
            data:{
                title:info.title,
                content:info.content,
                picture:info.picture,
                description:new Date(parseInt(new Date().getTime())).toLocaleString()
            }
        }).then(res=>{
            success()
        })
    }

    return (
        <>
            {contextHolder}
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{paddingTop:40}}
                onValuesChange={onFormLayoutChange}
                disabled={componentDisabled}
            >
                <Form.Item colon={false} label=" ">
                    <h2 >
                        来吧，尽情发挥吧！
                    </h2>
                </Form.Item>
                <Form.Item label="标题">
                    <Input onChange={(evt)=>{
                        setInfo({title:evt.target.value,content:info.content,picture: info.picture})

                    }}/>
                </Form.Item>

                <Form.Item label="正文">
                    <TextArea rows={4} onChange={(evt)=>{
                        setInfo({title:info.title,content:evt.target.value,picture: info.picture})

                    }}/>
                </Form.Item>
                <Form.Item label="上传图片" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label=" " colon={false}>
                    <Button type="primary" onClick={()=>handleOnClick()}>发布</Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default () => <FormDisabledDemo />;