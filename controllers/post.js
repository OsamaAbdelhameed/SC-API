const { Comment, Post } = require("../models/post");

const createPost = async(req, res) => {
    const post = new Post({...req.body });

    return await post
        .save()
        .then((p) => res.status(200).send({ post: p, message: 'Post created successfully' }))
        .catch((err) => res.status(500).send({ message: err.message }));
}

const updatePost = async(req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);

        return post
            .set(req.body)
            .save()
            .then((post) => res.status(200).json({ post }))
            .catch((err) => res.status(500).json({ err }))
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getAllPosts = async(req, res) => {
    return await Post.find()
        .then((posts) => res.status(200).json({ posts }))
        .catch((err) => res.status(500).json({ err }));
}

const changePostState = async(req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        return post
            .set(req.body)
            .save()
            .then((post) => res.status(200).json({ post }))
            .catch((err) => res.status(500).json({ err }));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const deletePost = async(req, res) => {
    try {
        const { id } = req.params;

        return await Post.deleteOne({ _id: id })
            .then((post) => res.status(200).json({ post }))
            .catch((err) => res.status(500).json({ err }));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const addComment = async(req, res) => {
    const id = req.params.id;

    const comment = new Comment({...req.body });

    return await Post.updateOne({ _id: id }, {
            '$push': {
                comments: comment
            }
        }).then((updatedPost) => res.status(200).json(updatedPost))
        .catch((err) => res.status(500).json({ err }));
}

module.exports = { createPost, updatePost, changePostState, getAllPosts, deletePost, addComment }