const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Required"],
    },
    address: {
        type: String,
        required: [true, "Required"],
    },    
    username: {
        type: String,
        required: [true, "Required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Required"],
        unique: true,
    },
    gender: {
        type: String,
    },
    date_of_birth: {
        type: Date,
        required: [true, "Required"]
    },
    password: {
        type: String,
        required: true,
    }, 
},
{
    timestamps: true,
},
);

module.exports = mongoose.model("users", userSchema);


console.log ("schema is active")