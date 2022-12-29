const mongoose=require('mongoose');
const mongooseURI="mongodb://localhost:27017/";

const connectToMongo=()=>
{
    mongoose.connect(mongooseURI,()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports=connectToMongo;