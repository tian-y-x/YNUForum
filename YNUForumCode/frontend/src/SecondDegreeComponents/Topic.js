import React, {useContext, useEffect, useState} from 'react';
import {LikeFilled, LikeOutlined, MessageOutlined, StarFilled, StarOutlined} from '@ant-design/icons';
import {Avatar, List, Space, message} from 'antd';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {GlobalContext} from "../routers/AppRouters";

const data = Array.from({
    length: 23,
}).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));


function Topic() {
    const [isActive1,setIsActive1] = useState(false)
    const [isActive2,setIsActive2] = useState(false)
    const [info,setInfo] = useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const value = useContext(GlobalContext)
    useEffect(()=>{
        messageApi.open({type:'success',content:'Hello '+value.n+' !',style: {marginTop: '10vh',}
        })
       axios({
           method:'post',
           url:'http://localhost:3333/topics'
       }).then(res=>{
           setInfo(res.data)
       })
    },[])
    const avadata = info
    for(let i in avadata){
        avadata[i]['avatar'] = `https://randomuser.me/api/portraits/men/${i}.jpg`
        avadata[i]['href'] = `http://localhost:3000/channel/${avadata[i]['id']}`
    }
    const navigate = useNavigate()
    const handleOnClick = (i)=>{
        //console.log(i)
        //console.log(avadata[i])
        navigate(`/channel/${avadata[i]['id']}`)
    }
    const IconText = ({icon, text,p}) => (
        <Space>
            {React.createElement(icon,{

                component:{fill:'black'},
                p:p,
                onClick:()=>{
                    if(p===1)
                        setIsActive1(!isActive1)
                    if(p===2)
                        setIsActive2(!isActive2)
                    if(p===3)
                        handleOnClick()
                }
            })}
            {text}


        </Space>
    );
    return (
        <>
        {contextHolder}
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    //console.log(page);
                },
                pageSize: 4,
            }}
            dataSource={avadata}
            footer={
                <div>
                    <a>  帮助  举报  用户反馈</a>
                </div>
            }
            renderItem={(item,index) => (
                <List.Item
                    onClick={() => handleOnClick(index)}
                    key={item.title}
                    actions={[

                        !isActive1?
                        <IconText icon={StarOutlined} text="156" p={1}/>
                            :<IconText icon={StarFilled} text="156" p={1}/>,
                        !isActive2?
                        <IconText icon={LikeOutlined} text="156" p={2}/>
                            :<IconText icon={LikeFilled} text="156" p={2}/>,
                        <IconText icon={MessageOutlined} text="2" p={3}/>,
                    ]}

                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar}/>}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />
        </>
    )
}

export default Topic;