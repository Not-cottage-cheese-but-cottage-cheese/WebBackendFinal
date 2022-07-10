const express = require('express');
const Mail = require('../models/mail');
const router = express.Router();

router.get('/incoming/:category', async (req, res) => {
  try {
    let mails = [];
    switch (req.params.category) {
      case 'all':
      default:
        mails = (await Mail.find({})) || [];
        break;
      case 'important':
        mails = (await Mail.find({ important: true })) || [];
        break;
      case 'flag':
        mails = (await Mail.find({ flag: true })) || [];
        break;
      case 'finance':
        mails = (await Mail.find({ finance: true })) || [];
        break;
      case 'confidence':
        mails = (await Mail.find({ confidence: true })) || [];
        break;
    }
    res.json({ isSucess: true, data: mails.slice(req.query.limit * req.query.offset, req.query.limit * (+req.query.offset + 1)) });
  } catch (e) {
    res.json({ isSuccess: false, message: e });
  }
});

router.patch('/:mailId', async (req, res) => {
  try {
    await Mail.updateOne({ _id: req.params.mailId }, { $set: { ...req.body } });
    res.json({ isSuccess: true });
  } catch (e) {
    res.json({ isSuccess: false, message: e });
  }
});

router.patch('/', async (req, res) => {
  try {
    await req.body.id.forEach(async (id) => {
      await Mail.updateOne({ _id: id }, { $set: { ...req.body.body } });
    });
    res.json({ isSuccess: true });
  } catch (e) {
    res.json({ isSuccess: false, message: e });
  }
});

module.exports = router;
