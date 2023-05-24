

const mongoose = require('mongoose')

const personneSchema = new mongoose.Schema({
    id: { type: Number , required: true },
    nom: { type: String , required: true },  
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    mail: { type: String, required: true },
    mdp: { type: String, required: true },
})

const Adherent = mongoose.model('Personne', personneSchema, 'Personne')

module.exports = Personne