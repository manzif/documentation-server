import express from 'express';
import endpoints from '../controllers/endpoints';
import verifyUser from '../middleware/verifyUser';

const route = express.Router();

route.post('/', endpoints.addEndpoint);
// route.get('/application/:id', verifyUser.applicationVerify, applications.viewApplication);
route.get('/endpoints', verifyUser.isAdmin, endpoints.getAllEndpoints);

export default route;