const mongoose = require("mongoose");
const {Schema,default: mongoose} = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
 
const userSchema = Schema({
    email: {type: String,unique: true},
    password: String,
    firstname: String,
    lastname: String,

});


const adminSchema = Schema({
    email: {type: String,unique: true},
    password: String,
    firstname: String,
    lastname: String,

});

const courseSchema = Schema({
    description : String,
    title: String,
    imageurl: String,
    creatorId: ObjectId,
    price:Number

});

const purchaseSchema = Schema({
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