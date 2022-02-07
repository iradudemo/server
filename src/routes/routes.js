import express from 'express';
import contactController from '../controller/contactController';
import authRoute from '../middleWare/auth';
import UserController from "../controller/usersController";
import blogController from '../controller/blogController';


const router = express.Router();



router.post('/message', contactController.sendMessage);
router.get('/message', authRoute, contactController.readAllMessage);
router.get('/message/:id', authRoute, contactController.readSingleMessage);
router.delete('/message/:id', authRoute, contactController.dropMessage);
router.post("/user/register", UserController.createUser)
router.get("/user",authRoute,UserController.findAllUsers)
router.post("/user/login",UserController.login)
router.post('/post', authRoute, blogController.createArticle);

router.get('/post/:id', blogController.getSingleArticle);
router.get('/post', blogController.getAllArticle);
router.delete('/post/:id', authRoute, blogController.deleteArticle);
router.patch('/post/:id', authRoute, blogController.updateArticle);
router.patch('/post/comments/:id', authRoute, blogController.comments);
router.patch('/post/like/:id', authRoute, blogController.likes);


module.exports = router;
