 const express=require('express');
 const mysql=require('mysql');
 var cors = require('cors');
 const app= express();
 const bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors())
const port=8080;
 app.listen(port,()=>{
      console.log('server started on port ',port);
 });



// use it before all route definitions



 //create connection
 const db=mysql.createConnection({
     host :'localhost',
     user :'root',
     password:'raj8987snehil#@',
     database:'nodemysql'
 });

 //connect
 db.connect((err)=>{
     if(err)
     console.log("error message ",err)
     
     console.log('mysql connected....');
 })

 //create db
 app.get('/createdb',(req,res)=>{
     let sql='CREATE DATABASE nodemysql';
     db.query(sql,(err,result)=>{
         if(err)
           console.log("error message ",err);
        res.send('database created');
     })
 })

 //create emp table
 app.get('/createposttable',(req,res)=>{
    let sql='CREATE TABLE emp(id int auto_increment,title varchar(255),body varchar(255) ,primary key (id))';
    db.query(sql,(err,result)=>{
        if(err)
          console.log("error message ",err);
    //    console.log(result);
       res.send('table created...');
    })
})
 
//get emp details
app.get('/getemp',(req,res)=>{
    let sql='select * from emp';
    db.query(sql,(err,result)=>{
        if(err)
          console.log("error message ",err);
    //    console.log(result);
       res.send(result);
    })
})

//no of emp in table
// app.get('/getnoemp',(req,res)=>{
//     let sql='SELECT COUNT(*)as no FROM emp' ;
//     db.query(sql,(err,result)=>{
//         if(err)
//         console.log("error message ",err);
        
//         var string=JSON.stringify(results);
//         console.log(string);
//         var json =  JSON.parse(string);
//        // to get one value here is the option
//         console.log(json[0]);
//     })
// })

//get individual details
app.get('/getemp/:id',(req,res)=>{
    let sql=`select * from emp where id =${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
        if(err)
          console.log("error message ",err);
    //    console.log(result);
       res.send(result);
    })
})

//delete emp
app.delete('/deleteemp/:id',(req,res)=>{
    let sql=`delete from emp where id=${req.params.id}`;
     db.query(sql,(err,result)=>{
        if(err)
          console.log("error message ",err);
    //    console.log(result);
       res.send(result);
    })
})

//post
app.post('/apppost',(req,res)=>{
    // res.send(req.body)
    const obj={
        id:req.body.id,
        title:req.body.title,
        body:req.body.body
    }
    // console.log(obj);
    let sql='insert into emp SET ?';
    // console.log(sql);
     db.query(sql,obj,(err,result)=>{
        if(err)
          console.log("error message ",err);
    //    console.log(result);
       res.send(result);
    })  
})

app.put('/putemp',(req,res)=>{
    let sql=`update emp set title='${req.body.title}',body='${req.body.body}' where id=${req.body.id}`
    db.query(sql,(err,result)=>{
        if(err)
          console.log("error message ",err);
    //    console.log(result);
      if(result.affectedRows===0)
       res.send({"message ":"not updated"});
       else
       res.send({"message ":"updated"});
    })
   
})

