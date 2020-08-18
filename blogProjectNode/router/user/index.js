const express = require('express')
const user = express.Router()
const connection = require('../../util/mysql')
// const bodyParser = require('body-parser')
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
user.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    let sql = 'select username,password from user'
    connection.query(sql,(err,rows,fields)=>{
        // rows[0]是查询到的第一行
        if(rows[0].username!=username||rows[0].password!=password){
            res.json({
                msg:'fail',
                data:{}
            })
            return
        }
        res.json({
            msg:'success',
            data:{}
        })
    })
   
})
module.exports = user