const express = require('express');
const router = express.Router();
const {Songs} = require('../handlers');

const handler = new Songs();

router.get('/:id', handler.getOneSong);
router.get('/name/:songName', handler.getSongByName);
router.post('/', handler.addSong);
router.put('/:id', handler.editSong);
router.delete('/:id', handler.deleteSong);

module.exports = router;
