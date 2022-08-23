const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const specalist = new Schema({
    name: String,
}, { timestamps: true });
const SpecalistModel = mongoose.model('specalist', specalist)
module.exports = SpecalistModel