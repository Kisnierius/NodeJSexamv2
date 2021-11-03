const express = require('express');
const accountsEntity = require('../../database/entities/accounts');

const router = express.Router();

const handleGetGroups = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { user_id } = req.params;
    // Get data from DB
    const groups = await accountsEntity.getGroups(user_id);
    res.send(groups);
  } catch (e) {
    console.log(e);
  }
};

const handleCreateAccount = async (req, res) => {
  try {
    const newAccount = req.body;
    const newAccountCreated = await accountsEntity.createAccount(newAccount);
    res.send(newAccountCreated);
  } catch (e) {
    console.log(e);
  }
};

router.get('/accounts/:user_id', handleGetGroups);
router.post('/accounts', handleCreateAccount);

module.exports = router;
