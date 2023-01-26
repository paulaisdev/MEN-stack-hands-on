import NoteSchema from "../models/noteSchema.js";

const getAll = async (req, res) => {
  try {
    const notes = await NoteSchema.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await NoteSchema.findById(req.params.id);

    if (note) {
      res.status(200).json({
        statusCode: 200,
        data: {
          note,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: `This note couldn't be found. Please check if the id exists or try again later. ${err.message}`,
    });
  }
};

const createNote = async (req, res) => {
  try {
    const newNote = new NoteSchema(req.body);

    const savedNote = await newNote.save();
    res.status(200).json({
      status: 200,
      message: "Nota adicionada com sucesso",
      data: {
        savedNote,
      },
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};

const updateNoteById = async (req, res) => {
  try {
    const note = await NoteSchema.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      statusCode: 200,
      message: "Nota atualizada com sucesso",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};

const deleteNoteById = async (req, res) => {
  try {
    const note = await NoteSchema.findByIdAndDelete(req.params.id);

    await note.delete();

    res.status(200).json({
      statusCode: 200,
      message: "Nota deletada com sucesso",
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: err.message,
    });
  }
};

export default {
  getAll,
  getNoteById,
  createNote,
  updateNoteById,
  deleteNoteById,
};
