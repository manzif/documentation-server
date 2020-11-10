import express from 'express';
import endpoints from '../controllers/endpoints';
import verifyUser from '../middleware/verifyUser';

const route = express.Router();

route.post('/:applicationId', endpoints.addEndpoint);
route.get('/endpoints/:id', verifyUser.isAdmin, endpoints.viewEndpoint);
route.get('/:applicationId', verifyUser.isOwner, endpoints.getAllEndpoints);
route.patch('/endpoints/:id', verifyUser.isAdmin, endpoints.updateEndpoint);
route.delete('/endpoints/:id', verifyUser.isAdmin, endpoints.deleteEndpoint);

export default route; 