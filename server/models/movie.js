const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	name: String,
	genres: [String],
	actorIds: [String],
	year: String,
	directorId: String
});

module.exports = mongoose.model('Movie', movieSchema);