

const mongoose = require('mongoose')

const produitSchema = new mongoose.Schema({
    id: { type:Number , integer:true },
    title: { type: String , required: true },  
    price: { type: Number },
    description: { type: String },
    quantity: { type: Number, integer:true },
    made: { type: String },
})

const Produit = mongoose.model('Produit', produitSchema, 'Produit')

module.exports = Produit