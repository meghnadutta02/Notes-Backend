import Note from "../models/NoteModel.js";

// Validate Note Data Length
const validateNoteLength = (title, content) => {
  const errors = [];

  if (title && title.length > 100) {
    errors.push("Title cannot exceed 100 characters");
  }

  if (content && content.length > 1000) {
    errors.push("Content cannot exceed 1000 characters");
  }

  return errors;
};

// Create Note
const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (
      !title ||
      title.trim().length === 0 ||
      !content ||
      content.trim().length === 0
    ) {
      return res.status(400).json("All fields are required");
    }

    const validationErrors = validateNoteLength(title, content);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const newNote = await Note.create({
      title,
      content,
      creator: req.user._id,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// Update Note
const updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const validationErrors = validateNoteLength(title, content);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content } },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// Retrieve Notes for the currently logged in user
const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ creator: req.user._id });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Retrieve Single Note by ID
const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Delete Note
const deleteNote = async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { createNote, getNotes, getNoteById, updateNote, deleteNote };
