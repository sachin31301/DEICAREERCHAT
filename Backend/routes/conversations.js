const router = require("express").Router();
const Conversation = require("../models/Conversation");
var mongoose = require('mongoose');
const User = require("../models/User");

//new conv

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    console.warn(err);
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    if(conversation==null){
      const newConversation = new Conversation({
        members: [req.params.firstUserId, req.params.secondUserId],
      });
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    }
    else{
    res.status(200).json(conversation)
    }
    //res.status(200).json(conversation)
  } catch (err) {
    console.warn(err);
    res.status(500).json(err);
  }
});

router.post("/add", async (req, res) => {
  const name1=req.query.id ;
  const name2=req.query.uid;
  const user1 = await User.findOne({ username: name1 });
  const user2=  await User.findOne({ username: name2 });
 // await console.log(uid);
  const newConversation = new Conversation({
    members: [user1._id.toString(), user2._id.toString()],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation,user1,user2);
  } catch (err) {
    console.warn(err);
    res.status(500).json(err);
  }
});

module.exports = router;
