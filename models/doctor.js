const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const doctor = new Schema({
    name: String,
    specalist: { type: Schema.Types.ObjectId, ref: 'specalist' },
    phone: String,
    description: String,
}, { timestamps: true });
const DoctorModel = mongoose.model('doctor', doctor)
module.exports = DoctorModel