const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, "Please add a name"],
        maxlength: 32
    },
    email:{
        type: String,
        trim: true,
        required: [true, "Please add an email"],
        unique: true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    password:{
        type: String,
        trim: true,
        required: [true, "Please add a Password"],
        minlength : [6, "Password must have more than 6 characters"],
        match:[
            /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
           'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
        ]
    },
    role: {
        type: String,
        default: 'user'
    },
}, {timestamps: true})

//encrypting password before save
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Verify password
userSchema.methods.comparePassword = async function(yourPassword){
    return await bcrypt.compare(yourPassword, this.password)
}

//return jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id}, //userID
    process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}

module.exports = mongoose.model('User', userSchema)