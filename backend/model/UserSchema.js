const mongoose =  require('mongoose');
const { type } = require('os');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
   name:{
    type : String,
    },

   email:{
     type : String,
     require : true,
   },

   password:{
    type : String,
    require : true,
   }
})

UserSchema.pre('save',async function(next){
   const person =this;
   if(!person.isModified('password')){return next();}
   try{
     const salt = await bcrypt.genSalt(10);
     const hashPassword = await  bcrypt.hash(person.password,salt);
     person.password = hashPassword ;
   }catch(err){
     throw err;
   }
})

UserSchema.methods.comparePassword = async function(candidatePassword){
  try{
  const IsMatch = bcrypt.compare(candidatePassword,this.password);
  return IsMatch;
  next();
  }catch(err){
    return next(err);
  }
}

module.exports = mongoose.model('User' , UserSchema);