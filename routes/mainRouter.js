const uuid = require('../helpers/uuid');

const router = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');


router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


router.post('/notes', (req, res) => {
    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        
        readAndAppend(newNote, './db/db.json');

        res.json('It woked, the note was added');
    } else {
        res.json('Error: Note did not post');
    }
});

router.delete("/notes/:id", async(req, res) => {
    const { id } = req.params;
    const note = JSON.parse(await readFromFile('./db/db.json', 'utf-8'));

    const notesIndex = note.findIndex(note => note.note_id === id);

    note.splice(notesIndex, 1);

    await writeToFile("./db/db.json", note);
    return res.send();
});


// Export all routes for use in server file
module.exports = router;