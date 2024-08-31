const Room = require("../models/roomModel");
const User = require("../models/userModel");

const createRoom = async (req, res) => {
  const { roomName } = req.body;
  try {
    const room = new Room({ roomName });
    await room.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Error creating room" });
  }
};

const joinRoom = async (req, res) => {
  const { roomName, username } = req.body;
  try {
    const room = await Room.findOne({ roomName });
    const user = new User({ username });
    room.users.push(user);
    await user.save();
    await room.save();
    res.json({ room, user });
  } catch (err) {
    res.status(500).json({ message: "Error joining room" });
  }
};

module.exports = { createRoom, joinRoom };
