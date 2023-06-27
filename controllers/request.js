const { Request } = require("../models/request");

const createRequest = async(req, res) => {
    const request = new Request({...req.body });

    return await request
        .save()
        .then((reque) => res.status(200).send({ request: reque, message: 'Request created successfully' }))
        .catch((err) => res.status(500).send({ message: err.message }));
}

const updateRequest = async(req, res) => {
    const id = req.params.id;
    try {
        const request = await Request.findById(id);

        return request
            .set(req.body)
            .save()
            .then((request) => res.status(200).json({ request }))
            .catch((err) => res.status(500).json({ err }))
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getAllRequests = async(req, res) => {
    return await Request.find()
        .populate('post', '')
        .then((requests) => {
            console.log(requests)
            res.status(200).json({ requests })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err })
        });
}

const changeRequestState = async(req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findById(id);

        return request
            .set(req.body)
            .save()
            .then((request) => res.status(200).json({ request }))
            .catch((err) => res.status(500).json({ err }));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const deleteRequest = async(req, res) => {
    try {
        const { id } = req.params;

        return await Request.deleteOne({ _id: id })
            .then((r) => res.status(200).json({ r }))
            .catch((err) => res.status(500).json({ err }));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = { createRequest, updateRequest, getAllRequests, changeRequestState, deleteRequest }