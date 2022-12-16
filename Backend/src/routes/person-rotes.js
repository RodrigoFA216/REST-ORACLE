const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//-------------------------------------------------------------------------------
//--------------------------------CRUD-CLIENTE----------------------------------
//-------------------------------------------------------------------------------
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
router.get('/readcliente/:id', async (req, res) => {
    const {id}=req.params;
    sql = "SELECT * FROM cliente WHERE CLI_TELEFONO=:id";
    let result = await BD.Open(sql, [id], false);
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
    res.status(204).json(Users);
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

//UPDATE SI
router.put("/updatecliente/:telefono", async (req, res, next) => {
    try {
        const {telefono}=req.params;    
        const { id, nombre, apellidoP, apellidoM, refdir, lada, email, direccion } = req.body;
        
        sql = "UPDATE cliente SET CLIENTE_ID=:id, CLI_NOMBRE=:nombre, CLI_APELLIDOP=:apellidoP, CLI_APELLIDOM=:apellidoM, CLI_REFDIR=:refdir, CLI_TELEFONO=:telefono, CLI_LADA=:lada, CLI_EMAIL=:email, CLI_DIRECCION=:direccion  WHERE CLI_TELEFONO=:telefono ";
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

router.put("/updateempleado/:telefono", async (req, res, next) => {
    try {
        const {telefono}=req.params;    
        const { id, nombre, apellidoP, apellidoM, lada, email, direccion, sucursal} = req.body;
        sql = "UPDATE empleado SET EMPLEADO_ID=:id, EMP_NOMBRE=:nombre, EMP_APELLIDOP=:apellidoP, EMP_APELLIDOM=:apellidoM, EMP_TELEFONO=:telefono, EMP_LADA=:lada, EMP_EMAIL=:email, EMP_DIRECCION=:direccion, EMP_SUCURSAL=:sucursal WHERE EMP_TELEFONO=:telefono ";
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
//-------------------------------------------------------------------------------
//--------------------------------CRUD-DETALLE_PEDIDO----------------------------
//-------------------------------------------------------------------------------
//READ
router.get('/readpedido', async (req, res) => {
    sql = "SELECT * FROM DETALLE_PEDIDO";
    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id": user[0],
            "numero": user[1],
            "FechaPedido": user[2],
            "FechaEntrega": user[3],
            "TipoPago": user[4],
            "Cliente": user[5],
            "Empleado": user[6],
            "PersonaRecibe": user[7],
            "CantidadPan": user[8],
            "Precio": user[9],
            "Tamaño": user[10],
            "TipoHarina": user[11],
            "Nombre": user[12]
        }
        Users.push(userSchema);
    })
    res.json(Users);
})
//create
router.post('/createdetallepedido', async (req, res) => {
    try {
        const { id, numeropedido, fechaped, fechaent, tipopago, cliente, empleado, recibe, cantidad, precio, tamaño, tipoharina, nombrepan } = req.body;
        sql = "insert into detalle_pedido(DETALLE_PED_ID, PED_NUMERO, PED_FECHAPED, PED_FECHAENT, PED_TIPOPAGO, PED_CLIENTE, PED_EMPLEADO, PED_PERSONARECIBE, PAN_CANTIDAD, PAN_PRECIO, PAN_TAMAÑO, PAN_TIPOHARINA, PAN_NOMBRE) values (:id, :numeropedido, :fechaped, :fechaent, :tipopago, :cliente, :empleado, :recibe, :cantidad, :precio, :tamaño, :tipoharina, :nombrepan)";
        await BD.Open(sql, [id, numeropedido, fechaped, fechaent, tipopago, cliente, empleado, recibe, cantidad, precio, tamaño, tipoharina, nombrepan], true);
        res.status(200).json({
            "id": id,
            "numeropedido": numeropedido,
            "fechaped": fechaped,
            "fechaent": fechaent,
            "tipopago": tipopago,
            "cliente": cliente,
            "empleado": empleado,
            "recibe": recibe,
            "cantidad": cantidad,
            "precio": precio,
            "tamaño": tamaño,
            "tipoharina": tipoharina,
            "nombrepan": nombrepan 
        })
    } catch (error) {
        console.log(error);
    }
})
//UPDATE
router.put("/updatedetallepedido/:numeropedido", async (req, res, next) => {
    try {
        const {numeropedido}=req.params;
        const { id, fechaped, fechaent, tipopago, cliente, empleado, personarecibe, cantidad, precio, tamaño, tipoharina, nombre} = req.body;
        sql = "UPDATE DETALLE_PEDIDO SET DETALLE_PED_ID=:id, PED_NUMERO=:numeropedido, PED_FECHAPED=:fechaped, PED_FECHAENT=:fechaent, PED_TIPOPAGO=:tipopago, PED_CLIENTE=:cliente, PED_EMPLEADO=:empleado, PED_PERSONARECIBE=:personarecibe, PAN_CANTIDAD=:cantidad, PAN_PRECIO=:precio, PAN_TAMAÑO=:tamaño, PAN_TIPOHARINA=:tipoharina, PAN_NOMBRE=:nombre WHERE PED_NUMERO=:numeropedido ";
        await BD.Open(sql, [id, numeropedido, fechaped, fechaent, tipopago, cliente, empleado, personarecibe, cantidad, precio, tamaño, tipoharina, nombre], true);
        res.status(200).json({
            "id": id,
            "numeropedido": numeropedido,
            "fechaped": fechaped,
            "fechaent": fechaent, 
            "tipopago": tipopago,
            "cliente": cliente,
            "empleado": empleado,
            "personarecibe": personarecibe,
            "cantidad": cantidad,
            "precio": precio,
            "tamaño": tamaño,
            "tipoharina": tipoharina,
            "nombrepan": nombre
        })
    } catch (error) {
        console.log(error);
    }
})
//DELETE SI
router.delete("/deletedetallepedido/:numeroPedido", async (req, res) => {
    try {
        const {numeroPedido} = req.params;
        sql = "DELETE FROM DETALLE_PEDIDO WHERE PED_NUMERO=:numeroPedido" ;
        await BD.Open(sql, [numeroPedido], true);
        res.json({ "msg": "Usuario Eliminado" })
    } catch (error) {
        console.log(error);
    }

})
//-------------------------------------------------------------------------------
//--------------------------------CRUD-PROVEEDORES-------------------------------
//-------------------------------------------------------------------------------
//READ
router.get('/readproveedor', async (req, res) => {
    sql = "SELECT * FROM PROVEEDOR ";
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
            "NombreEmpresa": user[7],
            "Direccion": user[8]
        }
        Users.push(userSchema);
    })
    res.json(Users);
})
//create
router.post('/createproveedor', async (req, res) => {
    try {
        const { id, nombre, apellidoP, apellidoM, telefono, lada, email, nombreempresa, direccion } = req.body;
        sql = "insert into proveedor(PROVEEDOR_ID, PROV_NOMBRE, PROV_APELLIDOP, PROV_APELLIDOM, PROV_TELEFONO, PROV_LADA, PROV_EMAIL,PROV_NOMBREEMPRESA, PROV_DIRECCION) values (:id,:nombre, :apellidoP, :apellidoM, :telefono, :lada, :email, :NombreEmpresa, :direccion)";
        await BD.Open(sql, [id, nombre, apellidoP, apellidoM, telefono, lada, email, nombreempresa, direccion], true);
        res.status(200).json({
            "id": id,
            "nombre": nombre,
            "apellidoP": apellidoP,
            "apellidoM": apellidoM,
            "telefono": telefono,
            "lada": lada,
            "email": email,
            "nombreempresa": nombreempresa,
            "direccion": direccion,
        })
    } catch (error) {
        console.log(error);
    }
})
//UPDATE
router.put("/updateproveedor/:telefono", async (req, res, next) => {
    try {
        const {telefono}=req.params;    
        const { id, nombre, apellidoP, apellidoM, lada, email, nombreempresa,  direccion } = req.body;
        sql = "UPDATE proveedor SET PROVEEDOR_ID=:id, PROV_NOMBRE=:nombre, PROV_APELLIDOP=:apellidoP, PROV_APELLIDOM=:apellidoM, PROV_TELEFONO=:telefono, PROV_LADA=:lada, PROV_EMAIL=:email, PROV_NOMBREEMPRESA=:nombreempresa, PROV_DIRECCION=:direccion  WHERE PROV_TELEFONO=:telefono ";
        await BD.Open(sql, [id, nombre, apellidoP, apellidoM, telefono, lada, email, nombreempresa, direccion], true);
        res.status(200).json({
            "id": id,
            "nombre": nombre,
            "apellidoP": apellidoP,
            "apellidoM": apellidoM,
            "telefono": telefono,
            "lada": lada,
            "email": email,
            "nombreempresa": nombreempresa,
            "direccion": direccion
        })
    } catch (error) {
        console.log(error);
    }
})
//DELETE SI
router.delete("/deleteproveedor/:telefono", async (req, res) => {
    try {
        const {telefono} = req.params;
        sql = "DELETE FROM PROVEEDOR WHERE PROV_TELEFONO=:telefono" ;
        await BD.Open(sql, [telefono], true);
        res.json({ "msg": "Usuario Eliminado" })
    } catch (error) {
        console.log(error);
    }

})
//-------------------------------------------------------------------------------
//--------------------------------CRUD-SUCURSALES--------------------------------
//-------------------------------------------------------------------------------
//READ
router.get('/readsucursales', async (req, res) => {
    sql = "SELECT * FROM SUCURSAL ";
    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id": user[0],
            "nombre": user[1],
            "telefono": user[2],
            "lada": user[3],
            "PaginaWeb": user[4],
            "Direccion": user[5]
        }
        Users.push(userSchema);
    })
    res.json(Users);
})
//create
router.post('/createsucursal', async (req, res) => {
    try {
        const { id, nombre, telefono, lada, paginaweb, direccion } = req.body;
        sql = "insert into sucursal(SUC_ID, SUC_NOMBRE, SUC_TELEFONO, SUC_LADA, SUC_PAGWEB, SUC_DIRECCION) values (:id, :nombre, :telefono, :lada, :paginaweb, :direccion)";
        await BD.Open(sql, [id, nombre, telefono, lada, paginaweb, direccion], true);
        res.status(200).json({
            "id": id,
            "nombre": nombre,
            "telefono": telefono,
            "lada": lada,
            "paginaweb": paginaweb,
            "direccion": direccion
        })
    } catch (error) {
        console.log(error);
    }
})
//UPDATE
router.put("/updatesucursal/:telefono", async (req, res, next) => {
    try {
        const {telefono}=req.params;    
        const { id, nombre, lada, paginaweb, direccion } = req.body;
        
        sql = "UPDATE sucursal SET SUC_ID=:id, SUC_NOMBRE=:nombre, SUC_TELEFONO=:telefono, SUC_LADA=:lada, SUC_PAGWEB=:paginaweb, SUC_DIRECCION=:direccion  WHERE SUC_TELEFONO=:telefono ";
        await BD.Open(sql, [id, nombre, telefono, lada, paginaweb, direccion], true);
        res.status(200).json({
            "id": id,
            "nombre": nombre,                
            "telefono": telefono,
            "lada": lada,
            "paginaweb": paginaweb,
            "direccion": direccion
        })
    } catch (error) {
        console.log(error);
    }
})
//DELETE SI
router.delete("/deletesucursal/:telefono", async (req, res) => {
    try {
        const {telefono} = req.params;
        sql = "DELETE FROM SUCURSAL WHERE SUC_TELEFONO=:telefono" ;
        await BD.Open(sql, [telefono], true);
        res.json({ "msg": "Usuario Eliminado" })
    } catch (error) {
        console.log(error);
    }

})
module.exports = router;

