const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
})

const Comment = mongoose.model('CommentEmbed', commentSchema)

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    location: { type: String, required: true },
    imgs: { type: [String], required: true },
    price: { type: Number, required: true },
    bedsNum: { type: Number, required: true },
    area: { type: Number, required: true },
    numOfReqs: { type: Number, required: true },
    comments: { type: [commentSchema], required: true },
    state: { type: String, required: true }
})

const Post = mongoose.model('Post', postSchema);

module.exports = { Comment, Post };