const commentValidation = (reqBody) =>{
    const secureComment = {
        email:joi.string().min(3).required(),
    }
     return joi.validate(reqBody, secureComment);
    }



module.exports.commentValidation = commentValidation;
