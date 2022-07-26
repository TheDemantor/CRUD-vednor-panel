const bodyparser = require('body-parser');
const mongoose=require('mongoose')

var schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    // id: {
    //     type:String,
    //     // required:true
    // },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    sold:{
        type:Number,
        required:true,
        default: 00,
    },
    img:{
        data: Buffer,
        contentType: String
    }
})

const itemdb = mongoose.model('itemdb', schema);

module.exports=itemdb;