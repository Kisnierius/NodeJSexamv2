const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { dbConfig, jwtSecret } = require('../../config');

const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase()
    .required(),
  password: Joi.string().required(),
});

router.post('/register', async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: 'incorrect data sent' });
  }
  try {
    const hashedPassword = bcrypt.hashSync(userData.password);
    const con = mysql.createConnection(dbConfig);
    const [data] = await con.execute('INSERT INTO users (email, password) VALUES(?, ?)', [userData.email, hashedPassword]);
    await con.end();
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'error, please try again' });
  }
});

router.post('/login', async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: 'incorrect data sent' });
  }
  //
  try {
    const hashedPassword = bcrypt.hashSync(userData.password);
    const con = mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        SELECT FROM users 
        WHERE email = ${mysql.escape(userData.email)}
        `);
    await con.end();

    if (data.lenght === 0) {
      return res.status(400).send({ err: 'incorrect data sent' });
    }

    const isAuthed = bcrypt.compareSync(hashedPassword, data[0].password);
    if (isAuthed) {
      const token = jwt.sign({
        id: data[0].id, email: data[0].email,
      },
      jwtSecret);

      return res.send('login successfull', token);
    }

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'error, please try again' });
  }
});

module.exports = router;
