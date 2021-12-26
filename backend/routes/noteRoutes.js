const express = require('express');
const { getNotes, createNote, getNoteByID, deleteNote } = require('../controllers/noteController');
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router();

router.route('/').get(protect, getNotes);
router.route('/create').post(protect, createNote);
router.route('/:id').get(protect, getNoteByID);
router.route('/:id').delete(protect, deleteNote);

module.exports = router;

