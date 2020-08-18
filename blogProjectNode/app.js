const express = require('express')
const app = express()
const user = require('./router/user/index')
const article = require('./router/article')
const bodyParser = require('body-parser')
// 解决跨域
app.use('*',(req,res,next)=>{
    // 设置允许跨域的域名，*代表全部
    res.header('Access-Control-Allow-Origin','*');
    // 允许header类型
    res.header('Access-Control-Allow-Headers','content-type');
    // 跨域允许的请求方式
    res.header('Access-Control-Allow-Methods','PUST,POST,GET,DELETE');
    console.log(req.method);
        
    if(req.method.toLowerCase()=='options'){
        // axios content-type的application/json是默认发起一次预请求
        
        res.sendStatus(200)//让options尝试请求快速结束 
    }
    else{
        next()
    }
    
})
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user',user)
app.use('/article',article)
app.listen(3001,()=>{
    console.log('success');
})