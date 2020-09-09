import express from 'express';
import users  from './users';
import profiles  from './profiles';
import applications from './applications';

const router = express.Router();

router.use('/api/users', users);
router.use('/api/profiles', profiles);
router.use('/api/applications', applications);

export default router;