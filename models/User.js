const { Schema, model } = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

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
      ref: 'thought'
    },

    friends: {
      type: Schema.Types.ObjectId,
      ref: 'user'
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
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

module.exports = User;
