const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ 
//CLIENTE
router.get('/readcliente', async (req, res) => {
    sql = "SELECT * FROM cliente";
    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id": user[0],
            "nombre": user[1],
            "apellidoP": user[2],
            "apellidoM": user[3],
            "refdir": user[4],
            "telefono": user[5],
            "lada": user[6],
            "email": user[7],
            "direccion": user[8]
        }
        Users.push(userSchema);
    })
    res.json(Users);
})


//CREATE SI
router.post('/createcliente', async (req, res) => {
    try {
        const { id, nombre, apellidoP, apellidoM, refdir, telefono, lada, email, direccion } = req.body;
        sql = "insert into cliente(CLIENTE_ID, CLI_NOMBRE, CLI_APELLIDOP, CLI_APELLIDOM, CLI_REFDIR, CLI_TELEFONO, CLI_LADA, CLI_EMAIL, CLI_DIRECCION) values (:id,:nombre, :apellidoP, :apellidoM, :refdir, :telefono, :lada, :email, :direccion)";
        await BD.Open(sql, [id, nombre, apellidoP, apellidoM, refdir, telefono, lada, email, direccion], true);
        res.status(200).json({
            "id": id,
            "nombre": nombre,
            "apellidoP": apellidoP,
            "apellidoM": apellidoM,
            "refdir": refdir,
            "telefono": telefono,
            "lada": lada,
            "email": email,
            "direccion": direccion
        })
    } catch (error) {
        console.log(error);
    }
})

//UPDATE NO
router.put("/updateUser/:id", async (req, res, next) => {
    try {
        const {id}=req.params;
        const { name, lastname, gender } = req.body;
        
        sql = "UPDATE CUSTOMERS SET FIRST_NAME= :name, LAST_NAME= :lastname, GENDER= :gender WHERE CUSTOMER_ID=:id ";
        await BD.Open(sql, [id, name, lastname, gender], true);
        res.status(200).json({
            "id": id,
            "name": name,
            "lname": lastname,
            "gender": gender
        })
    } catch (error) {
        console.log(error);
    }
})
//DELETE SI
router.delete("/deletecliente/:telefono", async (req, res) => {
    try {
        const {telefono } = req.params;
        sql = "DELETE FROM CLIENTE WHERE CLI_TELEFONO=:telefono" ;
        await BD.Open(sql, [telefono], true);
        res.json({ "msg": "Usuario Eliminado" })
    } catch (error) {
        console.log(error);
    }
})
//-------------------------------------------------------------------------------
//--------------------------------CRUD-EMPLEADO----------------------------------
//-------------------------------------------------------------------------------
//READ
router.get('/readempleado', async (req, res) => {
    sql = "SELECT * FROM EMPLEADO";
    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id": user[0],
            "nombre": user[1],
            "apellidoP": user[2],
            "apellidoM": user[3],
            "telefono": user[4],
            "lada": user[5],
            "email": user[6],
            "direccion": user[7],
            "sucursal": user[8]
        }
        Users.push(userSchema);
    })
    res.json(Users);
})
//CREATE
router.post('/createempleado', async (req, res) => {
    try {
        const { id, nombre, apellidoP, apellidoM, telefono, lada, email, direccion, sucursal } = req.body;
        sql = "insert into empleado(EMPLEADO_ID, EMP_NOMBRE, EMP_APELLIDOP, EMP_APELLIDOM, EMP_TELEFONO, EMP_LADA, EMP_EMAIL, EMP_DIRECCION, EMP_SUCURSAL) values (:id,:nombre, :apellidoP, :apellidoM, :telefono, :lada, :email, :direccion, :sucursal)";
        await BD.Open(sql, [id, nombre, apellidoP, apellidoM, telefono, lada, email, direccion, sucursal], true);
        res.status(200).json({
            "id": id,
            "nombre": nombre,
            "apellidoP": apellidoP,
            "apellidoM": apellidoM,
            "telefono": telefono,
            "lada": lada,
            "email": email,
            "direccion": direccion,
            "sucursal": sucursal
        })
    } catch (error) {
        console.log(error);
    }
})
//UPDATE
router.put("/updateUser/:id", async (req, res, next) => {
    try {
        const {id}=req.params;
        const { name, lastname, gender } = req.body;
        
        sql = "UPDATE CUSTOMERS SET FIRST_NAME= :name, LAST_NAME= :lastname, GENDER= :gender WHERE CUSTOMER_ID=:id ";
        await BD.Open(sql, [id, name, lastname, gender], true);
        res.status(200).json({
            "id": id,
            "name": name,
            "lname": lastname,
            "gender": gender
        })
    } catch (error) {
        console.log(error);
    }
})
//DELETE SI
router.delete("/deleteempleado/:telefono", async (req, res) => {
    try {
        const {telefono } = req.params;
        sql = "DELETE FROM EMPLEADO WHERE EMP_TELEFONO=:telefono" ;
        await BD.Open(sql, [telefono], true);
        res.json({ "msg": "Usuario Eliminado" })
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;