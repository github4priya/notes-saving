const Note = require('../models/noteModel');
const asyncHandler = require('express-async-handler')

const getNotes = asyncHandler(async(req, res)=>{
    const notes = await Note.find({user: req.user._id})
    res.json(notes);
})

const createNote = asyncHandler(async(req, res)=>{
    const { title, content, category } = req.body;

    if(!title || !content || !category)
    {
        res.status(400);
        throw new Error("Please fill all fields");
        return;
    }
    else{
        const note = new Note({user: req.user._id, title, content, category});
        const createdNote = await note.save();

        res.status(201).json(createdNote);
    }
});

const getNoteByID = asyncHandler(async(req, res)=>{
    const note = await Note.findById(req.params.id);
    if(note)
    {
        res.json(note);
    }
    else{
        res.status(404).json({message: "Note not found"});
    }

    // console.log("wait we are getting the note")

})

const deleteNote = asyncHandler(async(req, res)=>{
    const note = await Note.findById(req.params.id);
    // if(note.user.toString() !== req.user._id.toString())
    // {
    //     res.status(401);
    //     throw new Error("You cannot deete this")
    // }
    if(note)
    {
        await note.remove();
        res.json({message: "removed !"})
    }
    else
    {
        res.status(404);
        throw new Error("Note is not found");
    }
})

module.exports = {getNotes, createNote, getNoteByID, deleteNote}