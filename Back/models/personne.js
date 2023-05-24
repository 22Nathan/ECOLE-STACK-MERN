

const mongoose = require('mongoose')

const personneSchema = new mongoose.Schema({
    id: { type: Number },
    nom: { type: String },  
    prenom: { type: String },
    telephone: { type: String },
    mail: { type: String },
    mdp: { type: String },
    admin: { type: Boolean },
})

const Personne = mongoose.model('Personne', personneSchema, 'Personne')

module.exports = Personne