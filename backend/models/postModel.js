const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
  {
    species: { type: String, required: [true, 'Please add a species'] },
    photo: { type: String, required: [true, 'Please add a photo'] },
    bait: { type: String, required: [true, 'Please add a bait type'] },
    location: String,
    length: Number,
    weight: Number,

    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
