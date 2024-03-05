const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    level: {
      type: Number,
      required: true,
      enum: [1, 2]
    }
});

adminSchema.pre('save', async function(next){
    if(!this.isNew) {
        return next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

adminSchema.statics.login = async function(email, password){
  const admin = await this.findOne({ email });
  console.log(email);
  console.log(admin);
  if(!admin){
    return false;
  }
  else{
    console.log(admin);
    console.log(password);
    const auth = await bcrypt.compare(password, admin.password);
    console.log(auth);
    if(auth){
      return admin;
    }
    else{
      return false;
    }
  }
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;