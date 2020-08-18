// 查询函数
const connection = require('./mysql')
 function query(sql,arr,msg){
     return new Promise((solve,reject)=>{
        connection.query(sql,arr,(err,result,fields)=>{
            if(err){
                reject(err)
            }else{
                // console.log(result);
                
                solve(result)
                // console.log(msg);
            }
        })
    })
}
module.exports = {query}