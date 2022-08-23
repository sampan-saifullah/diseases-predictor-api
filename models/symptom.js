const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const symptom = new Schema({
    name: String,
}, { timestamps: true });
const SymptomModel = mongoose.model('symptom', symptom)
module.exports = SymptomModel