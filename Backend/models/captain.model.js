const mongoose = require('mongoose');

const bcrypt = require('bycrypt');
const jwt = require('jsonwebtken');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required:true,
            minlength: [3, 'First name must be threee characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'last name must be three characters long'],
        },
    },

    email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
    },

    password: {
            type: String,
            required: true,
            select: false,
    },
    
    socketId: {
        type: String,
    },

    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },

    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long'],
        },
        capacity:{
            type: Number,
            required: true,
            minlength: [1, 'Capacity must be at least 1 character long'],
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        },
    },

   location:{
    // latitude
    lat:{
        type: Number,
    },
    // longitude
    lng:{
        type: Number,
    }
   }
})

//generate the auth token
captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

//compare the password
captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

//hash the password
// captainSchema.pre('save', async function(next){
//     //check if the password is modified
//     if(!this.isModified('password')){
//         return next();
//     }
//     //hash the password
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
// })

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 12);
}


//create the captain model
const captainModel = mongoose.model('captain', captainSchema);

//export the user model
module.exports = captainModel;