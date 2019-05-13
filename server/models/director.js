const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
	name: String
});

module.exports = mongoose.model('Director', directorSchema);