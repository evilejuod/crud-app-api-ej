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
  // const sql = `SELECT * FROM users WHERE id=?`;





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


//DELETE/api/users/:id
const deleteUser = async (req, res) => {
  const { id } = req.params
  const sql = ` DELETE FROM users WHERE id = ?`;

  const dbResult = await dbAction(sql, [id])

  if (dbResult === false) return dbFail(res, 'error deleting user');

  if (dbResult.affectedRows === 1) {
    dbSuccess(res, 'user deleted')
  }

  res.status(500).json({ error: 'something went wrong' })

}

//PUT/api/users/:id
const updateUser = async (req, res) => {

  const userToUpdate = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: hashValue(req.body.password),
    id: req.params.id
  };

  const sql = ` 
    UPDATE users SET name=?, age=?, email=?, password=?
    WHERE id = ?
    `;

  const dbResult = await dbAction(sql, Object.values(userToUpdate));

  if (dbResult === false) {
    return res.status(500).json({ error: 'something went wrong' });
  }

  if (dbResult.affectedRows === 1) {
    return res.json({ msg: 'user has been updated', user: userToUpdate.email });
  }

  res.status(500).json({ error: 'something went wrong' })
  

}


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser
};
