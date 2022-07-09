const express = require("express");
const Mail = require("../models/mail");
const router = express.Router();

router.get("/incoming", async (req, res) => {
  try {
    const mails = await Mail.find({});
    res.json({ isSucess: true, data: mails });
  } catch (e) {
    res.json({ isSuccess: false, message: e });
  }
});

router.post("/", async (req, res) => {
  const mail = new Mail({ ...req.body });
  try {
    // await mail.save();
    res.json({ isSuccess: true });
  } catch (e) {
    res.json({ isSuccess: false, message: e });
  }
});

router.patch("/:mailId", async (req, res) => {
  try {
    await Mail.updateOne({ _id: req.params.mailId }, { $set: { ...req.body } });
    res.json({ isSuccess: true });
  } catch (e) {
    res.json({ isSuccess: false, message: e });
  }
});

router.patch("/", async (req, res) => {
  try {
    await req.body.id.forEach(async (id) => {
      await Mail.updateOne({ _id: id }, { $set: { ...req.body.body } });
    })
    res.json({ isSuccess: true });
  } catch (e) {
    res.json({ isSuccess: false, message: e });
  }
});

module.exports = router;
