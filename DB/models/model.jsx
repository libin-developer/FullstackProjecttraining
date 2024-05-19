const mongoose = require('mongoose')

const productscheema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    discription:{
        type:String
    },
    price:{
        type:Number
    },
    imagepath:{
        type:String
    }
})

const product = mongoose.model('product', productscheema)

module.exports = product