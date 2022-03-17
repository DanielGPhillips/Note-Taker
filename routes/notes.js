const notes = require('express').Router();
const { readFromFile, readAndAppend, deleteId } = require('../helpers/fsUtils.js');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    console.log("Made a get request to /api/notes");
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    const newNote = {
        title,
        text, 
        id: uuidv4()
    };
    
    console.log(newNote);
    readAndAppend(newNote, './db/db.json');
    res.json(newNote);
});

notes.delete('/:id', (req, res) => {
    console.log(req.params.id);
    const idToDelete = req.params.id;
    deleteId(idToDelete, './db/db.json');
    res.json("Successfully processed delete request");
})

module.exports = notes;