const express = require('express');
const { dbAction, dbFail, dbSuccess } = require('../utils/dbHelper');
const { hashValue, verifyHash } = require('../utils/hashHelper');
const jwt = require('jsonwebtoken');

//GET/api/users
const getAllUsers = async (req, res) => {
  const sql = `SELECT * FROM users`;
  const dbResult = await dbAction(sql);

  if (dbResult === false) return dbFail(res);
  dbSuccess(res, dbResult);
}


const getUserById = async (req, res) => {
  
}

//POST/api/users
const createUser = async (req, res) => {
  console.log('req.body ===', req.body)

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
  const dbResult = await dbAction(sql, Object.values(newUser));

  if (dbResult === false) {
    return res.status(500).json({ error: 'something went wrong' });
  }

  if (dbResult.affectedRows === 1) {
    return res.json({ msg: 'new user added', newUser: newUser.email });
  }

  console.log('no rows affected')
  res.status(500).json({ error: 'something went wrong' })
}

const deleteUser = async (req, res) => {
  
}


const updateUser = async (req, res) => {

  

}



module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser
};
