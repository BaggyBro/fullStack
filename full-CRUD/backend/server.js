const mysql = require('mysql')
const cors = require('cors')
const express = require('express')
const app = express();

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projs"
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.get("/", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: "An error occurred while fetching users" });
    }
    return res.json(data);
  })
})

app.get("/:id", (req, res) => {
    const q = "SELECT * FROM users where id=?";
    const id = req.params.id

    db.query(q,id, (err, data) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: "An error occurred while fetching users" });
      }
      return res.json(data);
    })
  })

app.post("/create",(req,res) =>{
    const q = "insert into users (name,email) values (?)"
    const values = [
        req.body.name,
        req.body.email
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.status(500).json({error: err.message})
        return res.json(data)
    })
})

app.put("/update/:id",(req,res) =>{
    const q = "update users set name = ?, email = ? where id = ?"
    const values = [
        req.body.name,
        req.body.email,
    ]
    const id = req.params.id

    db.query(q,[...values,id],(err,data)=>{
        if(err) return res.status(500).json({error: err.message})
        return res.json(data)
    })
})

app.delete("/delete/:id",(req,res)=>{
    const q = "delete from users where id = ?"
    const id = req.params.id

    db.query(q,id,(err,data)=>{
        if(err) return res.status(500).json({error: err.message})
        return res.json(data)
    })
})

app.listen(9999, () => {
  console.log("Server listening on port 9999")
})