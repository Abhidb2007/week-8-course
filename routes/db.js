const mongoose = require("mongoose");
console.log("connected to")
mongoose.connect("mongodb+srv://adb49278:rl12fP92ud2KMkNU@cluster0.d9wdxfi.mongodb.net/") 
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: {type: String,unique: true},
    password: String,
    firstname: String,
    lastname: String,

});


const adminSchema = new Schema({
    email: {type: String,unique: true},
    password: String,
    firstname: String,
    lastname: String,

});

const courseSchema = new Schema({
    description : String,
    title: String,
    imageurl: String,
    creatorId: ObjectId,
    price:Number

});

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId


});

const userModel = mongoose.Model("user",userSchema);
const adminModel = mongoose.Model("admin",userSchema);
const courseModel = mongoose.Model("course",userSchema);
const purchaseModel = mongoose.Model("purchase",userSchema);

module.export = {
    userModule,
    adminModel,
    courseModel,
    purchaseModel
}