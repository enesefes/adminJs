const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    title: {type: String},
    author: {type: String},
    description: {type: String},
    date: {type: Date},
}, { timestamps: true });

const LibrarySchema = new mongoose.Schema({
    library_name: {type: String, required: true},
    library_opening_hours: { type: String, default: "09:00", required: true },
    library_closing_hours: { type: String, default: "21:00", required: true },
})

const Book = mongoose.model('Book', BookSchema);
const Library = mongoose.model('Library', LibrarySchema);



module.exports = {
    BookSchema,
    Book,
    Library,
}