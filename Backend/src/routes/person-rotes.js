const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ SI
router.get('/getUsers', async (req, res) => {
    sql = "SELECT * FROM hr.customers WHERE gender='FEMALE'";
    let result = await BD.Open(sql, [], false);
    Users = [];
    result.rows[0][0]
    result.rows.map(user => {
        let userSchema = {
            "id": user[0],
            "name": user[1],
            "lname": user[2],
            "gender": user[3]
        }
        Users.push(userSchema);
    })
    res.json(Users);
})

//CREATE SI
router.post('/addUser', async (req, res) => {
    try {
        const { id, name, lastname, gender } = req.body;
        sql = "insert into customers(CUSTOMER_ID, FIRST_NAME, LAST_NAME, GENDER) values (:id,:name,:lastname,:gender)";
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
router.delete("/deleteUser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        sql = "DELETE FROM CUSTOMERS WHERE CUSTOMER_ID=:id";
        await BD.Open(sql, [id], true);
        res.json({ "msg": "Usuario Eliminado" })
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;