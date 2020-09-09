import express from 'express';
import users from '../controllers/users';
import verifyUser from '../middleware/verifyUser';

const route = express.Router();

route.post('/', verifyUser.isAdmin, users.signUp);
route.post('/login', users.login);
route.post('/forgot-password', users.forgotPassword);
route.post('/reset-password/:userToken', users.resetPassword);

export default route;