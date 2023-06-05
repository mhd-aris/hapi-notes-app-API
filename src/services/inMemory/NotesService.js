import { nanoid } from "nanoid";
import InvariantError from "../../exceptions/InvariantError.js";
import NotFoundError from "../../exceptions/NotFoundError.js";
class NotesService {
  constructor() {
    this._notes = [];
  }

  // Menambahkan catatan baru
  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError("Catatan gagal ditambahkan");
    }

    return id;
  }

  // Membaca seluruh notes
  getNotes() {
    return this._notes;
  }

  // Mendapatkan notes berdasarkan id
  getNoteById(id) {
    const note = this._notes.filter((note) => note.id === id)[0];
    if (!note) {
      throw new NotFoundError("Catatan tidak ditemukan");
    }
    return note;
  }

  // Mengubah notes berdasarkan id
  editNoteById(id, { title, body, tags }) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError("Gagal memperbarui catatan. Id tidak ditemukan");
    }

    const updatedAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  // Menghapus notes berdasarkan id
  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new NotFoundError("Gagal memperbarui catatan. Id tidak ditemukan");
    }
    this._notes.splice(index, 1);
  }
}

export default NotesService;
