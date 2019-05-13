const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	name: String,
	genre: String,
	year: String,
	directorId: [ String ]
});

module.exports = mongoose.model('Movie', movieSchema);