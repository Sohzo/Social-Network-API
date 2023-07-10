const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Schema to create a reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },

    reactionBody: {
      type: String,
      required: true,
      max_length: 280
    },

    username: {
      type: String,
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

  },
  {
    toJSON: {
      getters: true
    },
  }
);

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

    username: {
      type: String,
      required: true
    },

    reactions: [reactionSchema]

  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);


const Thought = model('course', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length
});

module.exports = Thought;