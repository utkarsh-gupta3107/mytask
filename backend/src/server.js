const express= require("express");
const cors=require("cors");
const mysql=require("mysql");
const app= express();

app.use(express.json());
app.use(cors()); 

// connecting to db mysql
const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mysql"
})

// creating an API
app.get("/",(req,res)=>{
// res.json("hello from backend");
const sql= "SELECT * FROM task";
db.query(sql,(err,data)=>{
    if(err) return app.json("Error");
    return res.json(data);
})
})

app.post('/', (req, res) => {
    const sql = "INSERT INTO task (Title) VALUES (?)";
    const values = [req.body.Title];
    db.query(sql, values, (err, data) => {
      if (err) {
        return res.status(500).json({ success: 0, message: "Error" });
      }
      return res.json({ success: 1, data });
    });
  });
app.put('/update/:ID',(req,res)=>{
    const sql="update task set `Title`=? where ID=? ";
    const values = [req.body.Title];
    const ID= [req.params.ID];
    console.log(values)
    // console.log(values);
    db.query(sql,[values,ID],(err,data)=>{
        if(err) return res.status(500).json("Error");
        return res.json(data) ;
    })
})

app.delete('/task/:id',(req,res)=>{
    const sql="DELETE FROM task where ID=? ";
    const id=req.params.id;
    const values = [req.body.Title];
    db.query(sql,[id],(err,data)=>{
        if(err) return res.status(500).json("Error");
        return res.json(data) ;
    })
})





app.listen(8081,()=>{
    console.log("listening 8081");
})