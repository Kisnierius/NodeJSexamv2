const mysql = require('mysql2/promise');
const { dbConfig } = require('../../config');

/// IMAM JWT TOKEN
const { isLoggedIn } = require('../../middleware');
///

// eslint-disable-next-line camelcase
const getGroups = async () => {
  try {
    const con = await mysql.createConnection(dbConfig);
    // eslint-disable-next-line camelcase
    const [groups] = await con.execute('SELECT * FROM Accounts JOIN groups ON Accounts.user_id=users.id JOIN bills ON Accounts.group_id=groups_tbl.id WHERE user_id = ?', [isLoggedIn.id]);

    await con.end();
    return groups;
  //  res.status(200).json(Account);
  } catch (e) {
    return { error: e };
  }
};

const createAccount = async (newAccount) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [newAccountCreated] = await con.execute('INSERT INTO Accounts (id, user_id) VALUES(?, ?, ?)', [newAccount.id, user_id]);
    await con.end();
    return newAccountCreated;
  } catch (e) {
    return e;
  }
};

module.exports = {
  getGroups,
  createAccount,
};
