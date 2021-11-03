const express = require('express');
const billsEntity = require('../../database/entities/bills');

const router = express.Router();

const handleGetbills = async (req, res) => {
  try {
    const { group_id } = req.params;
    console.log(group_id);
    // NEREIKIA - jei darom escape tai prie DB
    // const escapedId = mysql.escape(id);
    // console.log ('23 eilute', escapedId);
    // console.log(escapedId);
    const bills = await billsEntity.getbill(group_id);
    res.send(bills);
  } catch (e) {
    console.log(e);
  }
};

const handleCreatebill = async (req, res) => {
  try {
    const newbill = req.body;
    const newbillCreated = await billsEntity.createbill(newbill);
    res.send(newbillCreated);
  } catch (e) {
    console.log(e);
  }
};

router.get('/bills', handleGetbills);
router.post('/bills', handleCreatebill);

module.exports = router;
