const mongoose = require("mongoose");

const userSchema = new mongoose.Schema( {
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "Firstname must be at least 3 characters long"]
        },
        lastname: {
            type: String,
            minlength: [3, "Lastname must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
        
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [4, "Password must be at least 4 characters long"]
    },
    socketId:{
        type: String,
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },

    vehicle: {
        type: mongoose.Schema
    }
}
})
