const express = require('express')
const app = express()
const port = 3000

const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb"
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const insertPeople =  `INSERT INTO people (name) VALUES ('Kleber')`

connection.query(insertPeople)
connection.end

app.get('/', (req, res) =>{
    res.send('<h1> 20250211 - Learning how to use docker compose </h1>')
})

app.listen(port,()=>{
    console.log('Running at port ' + port)
})