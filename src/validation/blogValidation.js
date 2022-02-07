import joi from '@hapi/joi';


//article validation
const articleValidation = (reqBody) =>{
const articleModel = joi.object({
    title:joi.string().min(6).required(),
    articleBody:joi.string().required(),
    imageUrl:joi.string().min(4).required(),
});
 return joi.validate(reqBody, articleModel);
}
module.exports.articleValidation = articleValidation;


