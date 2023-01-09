import React, {useContext, useEffect, useState} from 'react';
import '../css/Channel.css'
import {Avatar, Button, Divider, Drawer, Input, List, Radio, Space,message} from "antd";
import {FormOutlined, StarOutlined, UserOutlined} from "@ant-design/icons";
import Comments from "../components/Comments";
import axios from "axios";
import {useLocation} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {GlobalContext} from "../routers/AppRouters";


function Channel(props) {

    const location = useLocation();
    const [info, setInfo] = useState()
    const [topic, setTopic] = useState()
    const topic_id = location.pathname.split('/')[2]
    const value = useContext(GlobalContext)
    //console.log(value)
    useEffect(() => {
        axios({
            method: 'post',
            url: `http://localhost:3333/channel/${topic_id}`
        }).then(res => {
            //console.log(res.data)
            setInfo(res.data)

        })
        axios({
            method: 'post',
            url: `http://localhost:3333/topic/${topic_id}`
        }).then(res => {
            //console.log(res.data[0])
            setTopic(res.data[0].title)

        })
    }, [])


    const [open, setOpen] = useState(false)
    const [txt,setText] = useState()
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [messageApi, contextHolder] = message.useMessage();


    function onTextChange(evt) {
        //console.log(evt.target.value)
        setText(evt.target.value)
    }
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '发布成功！',
        });
    };
    function handleTextChange()  {
        axios({
            method: 'post',
            url: `http://localhost:3333/addcomment`,
            data:{
                topicId:topic_id,
                content:txt,
                userName:value.n,
                topicTitle:topic

            }
        }).then(res => {
            success()
        })
    }

    return (
        <>
            {contextHolder}

        <div className={'top'}>

        <div className={'head'}>
            {topic}

            <span>
                    <Button style={{marginLeft: 20, marginRight: 20}} type={"primary"} onClick={showDrawer}
                            icon={<FormOutlined/>} ghost>评论</Button>
                    <Drawer title="评论千万条，友善第一条" placement="top" onClose={onClose} open={open} height={220}
                            extra={
                                <Space>
                                    <Button type="primary" onClick={() => {
                                        handleTextChange()
                                    }}>发布</Button>
                                    <Button onClick={onClose}>取消</Button>
                                </Space>}>
                        <div style={{paddingLeft: '50px', paddingTop: '10px'}}>
                            <TextArea showCount maxLength={100} placeholder="input with clear icon" allowClear
                                      style={{width: '70%', height: '100'}} rows={3} onChange={(evt) => {
                                onTextChange(evt)
                            }}/>
                        </div>
                    </Drawer>
                </span>
            <span>
                    <Button style={{marginLeft: 20, marginRight: 20}} type={"primary"} icon={<StarOutlined/>}
                            ghost>关注</Button>
                </span>
        </div>
        <div className={'floors'}>
            <List
                size="large"
                header={<div>共 {info ? info.length : ""} 条评论</div>}
                footer={<div>没有其他评论了哦</div>}
                bordered
                dataSource={info}
                pagination={{
                    onChange: (page) => {
                        //console.log(page);
                    },
                    pageSize: 7,
                }}
                renderItem={(item, index) => (
                    <List.Item className={'floor'}>
                        <div className={'info'}>
                            <div className={'avt'}>
                                <Avatar size={64}
                                        src={`https://randomuser.me/api/portraits/men/${index}.jpg`}/>
                            </div>
                            <div className={'name'}>
                                {item.user_name}
                            </div>


                        </div>
                        <div className={'content'}>
                            <div className={'sentence'}>
                                {item.content}
                            </div>
                            <Divider className={'Divider'} plain orientation='left'></Divider>
                            <div className={'comments'}>
                                <Comments></Comments>
                            </div>

                        </div>
                        <div>{index + 1}楼</div>
                    </List.Item>
                )}
            />
        </div>


    </div>
        </>
    )
}

export default Channel;