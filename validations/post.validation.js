const Joi = require('joi');

const createArticleSchema = Joi.object({
    title: Joi.string().min(5).max(200).required().trim(),
    content: Joi.string().min(20).required(),
    author: Joi.string().optional().default('Guest')
});


const validateArticle = (req, res, next) => {
    console.log(req.body);
    const {error} = createArticleSchema.validate(req.body);

    if(error) {
        return res.status(400).json({
            error: error.details[0].message,
        });
    }
    next();
};


const updateArticleSchema = Joi.object({
    title: Joi.string().min(5).max(200).trim(),
    content: Joi.string().min(20).trim(),
    author: Joi.string().trim(),
});

const validateUpdateArticle = (req, res, next)  => {
    const {error} = updateArticleSchema.validate(req.body);

    if(error) {
        return res.status(400).json({
            error : error.details[0].message,
        });
    }
    next();
};

module.exports = {
    validateArticle,
    validateUpdateArticle,
};

