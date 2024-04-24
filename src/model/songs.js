// backend: model.js

const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    songName: {
      type: String,
      required: true,
    },
    singerName: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    songFile: {
      type: String, 
      required: true,
    },
  
    // dd more fields as needed
  },
  { timestamps: true }
);

const SongsModel = mongoose.model("Songs", songSchema);

module.exports = { SongsModel };
