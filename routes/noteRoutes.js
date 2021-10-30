
// Assignment: Note-Taker project 
// Author: Taoufik Ammi
// Date: 10/27/2021 
// Course: UNC Coding BootCamp
const express = require("express");
const router = express.Router();
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  readFromFile("./db/db.json").then(data => res.json(JSON.parse(data)));
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  const noteIndex = notes.findIndex(note => note.note_id === id);
  notes.splice(noteIndex, 1);
  writeToFile("./db/db.json", notes);

  return res.send();
});


router.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
  } else {
    res.json("Error posting notes!!");
  }
});


module.exports = router;