const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")

app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "dt_empledos",
    password: ""
});

app.post("/create", (req, res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO tr_empleados (nombre,edad,pais,cargo,anios) VALUES (?,?,?,?,?)', [nombre, edad, pais, cargo, anios],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result)
            }
        }
    )
});

app.get("/empleados", (req, res)=>{

    db.query('SELECT * FROM tr_empleados ',
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result)
            }
        }
    )
});

app.put("/update", (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE tr_empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? where id=?', [nombre, edad, pais, cargo, anios,id],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result)
            }
        }
    )
});

app.delete("/delete/:id", (req, res)=>{
    const id = req.params.id;
    db.query('DELETE from dt_empledos.tr_empleados where id=?', id,
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result)
            }
        }
    )
});

app.listen(3001,()=>{
    console.log("Ejecutando en el puerto 3001");
});