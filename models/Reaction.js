const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// schema to create a reaction subdocument
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
    },

    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
