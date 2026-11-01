const Joi = require('joi');
const ArticleModel = require("../models/article.model.js");


const postArticle = async (req, res, next) => {
    const articleSchema = Joi.object({
        title: Joi.string().min(5).required,
        content: Joi.string().min(25).required,
        author: Joi.string().optional().default("Guest")
    });
    const {error, value} = articleSchema.validate(req.body);

    if(error){
        return res.status(400).json({
            error,
        })
    };
    try{
        const {title, content} = value
        const newArticle = new ArticleModel({
            title,
            content,
            author : author || "Guest",
        });
        await newArticle.save();

        return res.status(200).json(
            {
                message: "Article Created!",
                data : newArticle
            }
        )

    } catch (error) {
        next(error);
    };
};



const getAllArticle = async (req, res, next) => {
    const {limit = 10, page = 1} = req.query;
    const skip = (page -1) * limit;
    const articles = await Article.find({})
         .sort({created: -1})
         .limit(limit)
         .skip(skip)

        res.json(articles)
    try{
      const articles = await ArticleModel.find({})
         .sort({created: -1})
         .limit(limit)
         .skip(skip)


      return res.status(200).json({
        message:"Article fetched",
        data: articles
      })
    } catch (error) {
        console.error(error);
        next(error);
    };
};

const getArticleById = async (req, res, next) => {
    try{
       const article = await ArticleModel.findById(req.params.id)

       if(!article) {
        return res.status(404).json({
            message: `Article with ${req.params.id} not found`
        });
    
       }

       return res.status(200).json({
        message: "Article Found!",
        data: article
       });
    } catch (error) {
        console.error(error);
        next(error);
    };
};

const updateArticleById = async (req, res, next) => {

    const articleSchema = Joi.object({
        title: Joi.string().min(5).optional(),
        content: Joi.string().min(25).optional(),
        author: Joi.string().optional()
    });
    const {error, value} = articleSchema.validate(req.body);
    try{
      const updatedArticle = ArticleModel.findByIdAndUpdate(
        req.params.id,
        {...value},

        {
            new: true,
            runValidators: true,
        }
    );

    if(!updatedArticle){
        return res.status(404).json({
            message: 'Article Not Found',
            data : updatedArticle
        })
    }
    return res.status(200).json({
        message:'Article Updated!',
        data:updatedArticle

    });
    
    } catch (error) {
        next(error);
    };
};


const deleteArticleById = async (req, res, next) => {
    try{
       
       const article = await ArticleModel.findByIdAndDelete(req.params.id)

       if(!article) {
       return res.status(404).json({
       message:'Article Not Found!',
       });
    }

    res.status(200).json("Article Deleted!")
     } catch (error) {
        next(NativeError);
    }
};


module.exports = {
   postArticle,
   getAllArticle,
   getArticleById,
   updateArticleById,
   deleteArticleById
};
