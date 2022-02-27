const express = require("express");
const app = express();

const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: '',
    database: "node_crud_db"
})

app.get("/api/get", (req,res) => {
    const sqlget = "SELECT * FROM contact_table"
    db.query(sqlget, (err, result) => {
        console.log("error", err);
        console.log("result", result);
        res.send(result);
    });
});

app.get("/api/get/:id", (req,res) => {
    const {id} = req.params;

    const sqlget = "SELECT * FROM contact_table WHERE id = ?";
    db.query(sqlget, id , (err, result) => {
        if (err) {      
            console.log("error", err);
        }
        res.send(result);  
    });
});

app.put("/api/put/:id", (req,res) => {
    const {id} = req.params;
    const {name, email, mobile_no} = req.body;
    const sqlUpdate = "UPDATE contact_table SET name = ?, email = ?, mobile_no = ? WHERE id =?";
    db.query(sqlUpdate,[name,email,mobile_no,id] , (err, result) => {
        if (err) {      
            console.log("error in update", err);
        }  
        res.send(result); 
    });
});

app.post("/api/post", (req,res) => {
    const {name, email, mobile_no} = req.body;
    const sqlInsert = "INSERT INTO contact_table (name, email, mobile_no) VALUES (?,?,?)";
    db.query(sqlInsert, [name,email,mobile_no] , (err, result) => {
        if (err) {      
            console.log("error", err);
        }
        console.log("result", result);
        res.send(result);
    });
});

app.delete("/api/remove/:id", (req,res)=> {
    const {id} = req.params;
    const sqlRemove = "DELETE FROM contact_table WHERE id = ?";
   
    db.query(sqlRemove, id, (err, result) => {
        if (err) {
            console.log("error", err);
        }
       
    
    })
})
app.listen(5000, () => {
    console.log("server is running on port 5000");
})
