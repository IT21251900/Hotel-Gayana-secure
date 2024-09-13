const mongoose = require('mongoose');
//add variables
const vehicleSchema = new mongoose.Schema(
    {
        menu:{
        type:String,
        required:false 
    },
    menucat:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    menunumber:{
        type:Number,
        required:true,
        unique:true
    },
    description:{
        type:String,
    }
   
},
{ timestamps: true }
);
module.exports = mongoose.model('menu', vehicleSchema)

