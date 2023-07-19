const { Schema, model } = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

// Schema for creating a new user
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: [ isEmail, 'Invalid email']
    },
    
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    },

    friends: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },

    id: false,
  }
);


const User = model('User', userSchema)

module.exports = User;
