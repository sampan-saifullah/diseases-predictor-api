const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const diseases = new Schema({
    name: String,
    symptoms: [{ type: Schema.Types.ObjectId, ref: 'symptom' }],
    specalist: { type: Schema.Types.ObjectId, ref: 'specalist' },
}, { timestamps: true });
const DiseasesModel = mongoose.model('diseases', diseases)
module.exports = DiseasesModel