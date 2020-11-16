import express from 'express';
import applications from '../controllers/application';
import verifyUser from '../middleware/verifyUser';

const route = express.Router();

route.post('/', verifyUser.applicationVerify, applications.addApplication);
route.get('/applications/:id', applications.viewApplication);
route.get('/applications', applications.getAllApplications);
route.patch('/applications/:id', applications.updateApplication);
route.delete('/applications/:id', verifyUser.isAdmin, applications.deleteApplication);

export default route;