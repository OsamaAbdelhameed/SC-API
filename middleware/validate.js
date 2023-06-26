const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
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
    img: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    owner: Joi.string().required(),
});

const Schemas = {
    user: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: passwordComplexity().required(),
        gender: Joi.boolean().required(),
        phone: Joi.string().required(),
        role: Joi.string().required(),
        img: Joi.string().required(),
        age: Joi.number().required(),
        field: Joi.string(),
        numOfHouses: Joi.number(),
        state: Joi.string(),
    }),
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
        owner: Joi.string().required(),
    }),
    request: Joi.object({
        desc: Joi.string().required(),
        price: Joi.number().required(),
        status: Joi.string().required(),
        arrivalDate: Joi.string().required(),
        owner: Joi.string().required(),
        post: Joi.string().required(),
        postOwner: Joi.string().required(),
    })
};

module.exports = { validateSchema, Schemas };