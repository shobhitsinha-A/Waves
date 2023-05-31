const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true,
        //trim removes white spaces 
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    firstname:{
        type:String,
        maxLength: 100,
        trim: true,
        default:''
    },
    lastname:{
        type:String,
        maxLength: 100,
        trim: true,
        default:''
    },
    cart:{
        type:Array,
        default:[]
    },
    history:{
        type:Array,
        default:[]
    },
    verified:{
        type: Boolean,
        default: false
    }
});

userSchema.pre('save',async function(next){
    let user = this

    if(user.isModified('password')){
        //generate random string based on password salt how many times its going to go and do encryption
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }

    next()
});

//will work on instance 
userSchema.methods.generateAuthToken = function(){
    let user = this;
    //sub is convention we need to pass some options token to tell what to has
    const userObj = { sub: user._id.toHexString(), email:user.email };
    //inside baracket parameter what to hash, next super sercret password no one should know, when token will expire
    const token = jwt.sign(userObj, process.env.DB_SECRET,{ expiresIn:'1d'});
    return token;
}

userSchema.methods.generateRegisterToken = function(){
    let user = this;
    const userObj = { sub: user._id.toHexString() };
    const token = jwt.sign(userObj, process.env.DB_SECRET,{ expiresIn:'10h'});
    return token;
}

//statics works on the whole model 
userSchema.statics.emailTaken = async function(email){
    const user = await this.findOne({email});
    return !!user;
}

//will work on instance 
userSchema.methods.comparePassword = async function(candidatePassword){
    /// candidate password = unhashed password.
    const user = this;
    const match = await bcrypt.compare(candidatePassword, user.password);
    return match;
}

const User = mongoose.model('User',userSchema);
module.exports = { User };