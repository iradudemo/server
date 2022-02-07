import joi from '@hapi/joi';


//registration validation
const validateRegister = (reqBody) =>{
const registerModel = {
    firstname:joi.string().min(4).required(),
    lastname:joi.string().min(4).required(),
    username:joi.string().min(4).required(),
    email:joi.string().email().required(),
    password:joi.string().min(4).required(),
    userRole:joi.string()
}
 return joi.validate(reqBody, registerModel);
}
module.exports.validateRegister = validateRegister;
// login validation

const validateLogin = (reqBody) =>{
    const loginModel = {
        email:joi.string().email().required(),
        password:joi.string().min(4).required(),
    }
     return joi.validate(reqBody, loginModel);
    }

module.exports.validateLogin = validateLogin;