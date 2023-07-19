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


// userSchema.virtual('friendCount').get(function() {
//   return this.friends.length;
// });

const User = model('User', userSchema)

module.exports = User;
