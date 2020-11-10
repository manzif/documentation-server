import express from 'express';
import apis from '../controllers/apis';
import verifyUser from '../middleware/verifyUser';

const route = express.Router();

route.post('/', apis.addApi);
route.get('/apis/:id', verifyUser.isAdmin, apis.viewApi);
route.get('/apis', verifyUser.isOwner, apis.getAllApis);
route.patch('/apis/:id', verifyUser.isAdmin, apis.updateApi);
route.delete('/apis/:id', verifyUser.isAdmin, apis.deleteApi);

export default route; 