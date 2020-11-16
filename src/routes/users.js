import express from 'express';
import users from '../controllers/users';
import verifyUser from '../middleware/verifyUser';

const route = express.Router();

route.post('/', verifyUser.isAdmin, users.signUp);
route.get('/', verifyUser.isAdmin, users.getAllusers);
route.patch('/users/:id', verifyUser.isOwner, users.updateUser);
route.delete('/users/:id', verifyUser.isAdmin, users.deleteUser);
route.post('/login', users.login);

export default route;