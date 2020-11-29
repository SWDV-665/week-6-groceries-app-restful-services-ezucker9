const mongoose=require('mongoose')
var Schema=mongoose.Schema


var grocerySchema= new Schema({
    name:String,
    quantity:Number,
    price:Number
})


module.exports= mongoose.model("Grocery",grocerySchema,"grocery") 