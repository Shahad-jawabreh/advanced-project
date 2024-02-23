const express = require('express');
const sql = require('mysql2');
const app = express();

app.use(express.json())

const connection = sql.createConnection({
    host: 'localhost',
    user : 'root',
    password: '' ,
    database: 'crud'
});

app.post('/users',  (req, res)=>{
    console.log(req.body)
    const {name,email,bio} = req.body;  //destructing    

    
    const SQL = `INSERT INTO users(name, email, bio) VALUES ('${name}', '${email}', '${bio}')`;
    connection.execute(SQL); 
    return res.json({massege:'success'});
});

app.get('/userget',(req, res)=>{
    const SQL = `SELECT * FROM users`;
    const data = connection.execute(SQL,(err,result)=>{
        console.log(req.query)
        return res.json({users :result , massege:'success'});
    });
   
});

app.delete('/user',(req, res)=>{
    const {id} =req.query ;
    const SQL = `DELETE FROM users WHERE id = ${id} `;
     connection.execute(SQL,(err,result)=>{
        if(err){
            console.log(err)
            return res.json(err)    
        }else {
            return res.json("success")  
        }

     })
    });
   

app.listen(3000,()=>{
    console.log('listening on 3000');
})

