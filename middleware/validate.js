const Joi = require("joi");
const { Logging } = require("../library/logging");

const validateSchema = (schema) => {
    return async(req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            Logging.err(err);
            return res.status(422).json({ err });
        }
    };
};

const comment = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
});

const Schemas = {
    comment,
    post: Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        location: Joi.string().required(),
        imgs: Joi.array().items(Joi.string()).required(),
        price: Joi.number().required(),
        bedsNum: Joi.number().required(),
        area: Joi.number().required(),
        numOfReqs: Joi.number().required(),
        comments: Joi.array().items(comment).required(),
        state: Joi.string().required(),
    }),
    request: Joi.object({
        desc: Joi.string().required(),
        price: Joi.number().required(),
        status: Joi.string().required(),
        arrivalDate: Joi.string().required(),
        post: Joi.string().required(),
    })
};

module.exports = { validateSchema, Schemas };