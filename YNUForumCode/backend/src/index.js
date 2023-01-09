const express = require('express');
const cors = require("cors");
const DB = require("./database")
const mysql2 = require("mysql2");
const app = express();
app.use(express.json());
app.use(cors())

db = new DB()
conn = db.config()


app.all("*", function(req, res, next) {
    //response.writeHead(200, { "Content-Type": "text/plain" });
    next();
});

app.post('/login', async(req, res)=>{
    let flag = false
    let ans = (await conn.query('select * from login_info where name=?',[req.body.name]))[0]
    console.log(ans)
    for (let i of ans){
        console.log(i)
        if(req.body.pwd===i.pwd){
            flag=true
            res.status(200).send('true')
        }
    }
    if(!flag)
        res.status(200).send('false')

});

app.post('/register',async(req,res)=>{
    console.log([req.body.name,req.body.pwd,req.body.email])
    let ans = await conn.query(
        'insert into login_info(name,pwd,email) values(?,?,?)',[req.body.name,req.body.pwd,req.body.email])
    res.status(200).send()
})


app.post("/newtopic",async (req,res)=>{
    console.log([req.body.title,req.body.content,req.body.picture,req.body.description])
    let ans = await conn.query(
        'insert into topics(title,content,picture,description) values(?,?,?,?)',
        [req.body.title,req.body.content,req.body.picture,'发布于: '+req.body.description])
    res.status(200).send()

})
app.post("/topics",async (req,res)=>{
    let ans = (await conn.query('select * from topics'))[0]
    console.log(ans)
    res.status(200).send(ans)
})

app.post("/topic/:topic_id",async (req,res)=>{
    let ans = (await conn.query('select title from topics where id = ?',[req.params['topic_id']]))[0]
    console.log(ans)
    res.status(200).send(ans)
})

app.post("/channel/:topic_id",async (req,res)=>{
    let ans = (await conn.query('select * from comments where topic_id = ?',[req.params['topic_id']]))[0]
    console.log(ans)
    console.log(req.params)
    res.status(200).send(ans)
})
app.post("/addcomment",async (req,res)=>{
    console.log([req.body.topicId,req.body.content,req.body.topicTitle,req.body.userName])
    let ans = await conn.query(
        'insert into comments(topic_id,content,user_name,topic_title) values(?,?,?,?)',
        [req.body.topicId,req.body.content,req.body.userName,req.body.topicTitle])
    res.status(200).send()

})


app.listen(3333);