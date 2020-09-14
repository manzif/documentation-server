import express from 'express';
import applications from '../controllers/application';
import verifyUser from '../middleware/verifyUser';

const route = express.Router();

route.post('/', applications.addApplication);
route.get('/application/:id', verifyUser.applicationVerify, applications.viewApplication);
route.get('/applications', verifyUser.isAdmin, applications.getAllApplications);

export default route;