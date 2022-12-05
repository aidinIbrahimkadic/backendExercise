const express = require('express');
const app = express();
const mysql = require('mysql');

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database: 'backend_db'
})

db.connect();



app.get('/',(req,res)=>{
    const sql ="SELECT blog_post_id, title, description, body, createdAt, updatedAt, t.tag_name FROM blog_posts b JOIN tag_post tp ON b.blog_post_id = tp.blog_post JOIN tags t ON t.tag_id = tp.tags";

    db.query(sql,(err,result)=>{
        console.log(result);
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify(result))
    })
})

app.listen(3000,(err)=>{
    console.log('Radi');
})