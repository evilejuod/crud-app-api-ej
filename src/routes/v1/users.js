const express = require('express');
const { dbAction, dbFail, dbSuccess } = require('../../utils/dbHelper');
const { hashValue, verifyHash } = require('../../utils/hashHelper');
const { validateRegister } = require('../../utils/validateHelper');
const jwt = require('jsonwebtoken');
const { jwtSecret, dbConfig} = require('../../dbConfig');
const {authenticateToken} = require("../../utils/middleware");

const router = express.Router();

router.get('/users', async (req, res) =>{

    const sql = ` 
    SELECT * FROM users
    `;
})

router.get('/users/:id', async (req, res) =>{
    
    const sql = ` 
        SELECT * FROM employees WHERE id=?
    `;
})

router.post('/users/add-user', async (req, res) =>{
    const newUser = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: hashValue(req.body.password),
    };
    const sql = ` 
        INSERT INTO users (name, age, email, password)
        VALUES (?, ?, ?, ?)
    `;
    const dbResult = await dbAction(sql, Object.values(newUser))
    //   const dbResult = await dbAction(sql, [newUser.name, newUser.age, newUser.email, newUser.password])
    if (dbResult === false) {
        return res.status(500).json({ error: 'something went wrong' });
    }
    if (dbResult.affectedRows === 1) {
        return res.json({ msg: 'new user added', newUser: newUser.email });
    }
    console.log('no rows affected')
    res.status(500).json({error: 'something went wrong'})
})

router.delete('/users/:id', async (req, res) =>{
    
    const sql = ` 
    DELETE FROM users 
    WHERE id = ?
    `;
    
})

router.put('/users/:id', async (req, res) =>{
    
    const sql = ` 
    UPDATE users SET name=?, age=?, email=?, password=? 
    WHERE id = ?"
    `;
    
})


module.exports = router;