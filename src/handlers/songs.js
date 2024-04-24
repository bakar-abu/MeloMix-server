// backend: handlers.js

const { SongsModel } = require("../model");
const jwt = require("jsonwebtoken");

class Songs {
  getAllSongs = async (req, res) => {
    try {
      const songs = await SongsModel.find();
      res.json(songs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getOneSong = async (req, res) => {
    const { id } = req.params;
    try {
      const song = await SongsModel.findById(id);
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.json(song);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getSongByName = async (req, res) => {
    const { songName } = req.params;
    try {
      const song = await SongsModel.findOne({ songName });
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.json(song);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  addSong = async (req, res) => {
    const { songName, singerName, genre } = req.body;
    const songFile = req.file ? req.file.path : null; 
    try {
      const song = new SongsModel({
        songName,
        singerName,
        genre,
        songFile,
      });
      await song.save();
      res.status(201).json(song);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  editSong = async (req, res) => {
    const { id } = req.params;
    const { songName, singerName, genre } = req.body;
    try {
      const song = await SongsModel.findByIdAndUpdate(
        id,
        { $set: { songName, singerName, genre } },
        { new: true }
      );
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.json(song);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  deleteSong = async (req, res) => {
    const { id } = req.params;
    try {
      const song = await SongsModel.findByIdAndDelete(id);
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.json({ message: 'Song deleted' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
}

module.exports = Songs;
