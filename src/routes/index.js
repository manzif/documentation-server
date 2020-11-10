import express from 'express';
import users  from './users';
import profiles  from './profiles';
import applications from './applications';
import endpoints from './endpoints';
import apis from './apis';

const router = express.Router();

router.use('/api/users', users);
router.use('/api/profiles', profiles);
router.use('/api/applications', applications);
router.use('/api/endpoints', endpoints);
router.use('/api/apis', apis);

export default router;