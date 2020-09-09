import express from 'express';
import applications from '../controllers/application';
import verifyUser from '../middleware/verifyUser';

const route = express.Router();

route.post('/', applications.addApplication);
route.get('/application/:id', applications.viewApplication);
// route.post('/forgot-password', users.forgotPassword);
// route.post('/reset-password/:userToken', users.resetPassword);

export default route;