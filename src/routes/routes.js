import { Router } from 'express';
import userController from './../controllers/userController';
import tokenController from './../controllers/tokenController';

/**
 * Contains all API routes for the application.
 */
let router = Router();

router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/users', userController);
router.use('/auth/token', tokenController);

export default router;
