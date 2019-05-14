const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
	name: String
});

module.exports = mongoose.model('Actor', actorSchema);