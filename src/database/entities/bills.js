const mysql = require('mysql2/promise');
const { dbConfig } = require('../../config');

const getbills = async (group_id) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [bills] = await con.execute('SELECT * FROM bills WHERE group_id = ?', [group_id]); // su klaustuku prepared statement
    await con.end();
    return bills;
  //  res.status(200).json(bill);
  } catch (e) {
    return { error: e };
  }
};

const createbill = async (newbill) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [newbillCreated] = await con.execute('INSERT INTO bills (group_id, ammount, description) VALUES(?, ?, ?)', [newbill.group_id, newbill.ammount, newbill.description]);
    await con.end();
    return newbillCreated;
  } catch (e) {
    return e;
  }
};

module.exports = {
  getbills,
  createbill,
};
