const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SuperHeroeSchema = new Schema({
    id: {type: Number, required: true, unique:true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
}, {versionKey: false});

const SuperHeroeModel = mongoose.models.SuperHeroe || mongoose.model('superheroe', SuperHeroeSchema);
module.exports = SuperHeroeModel;