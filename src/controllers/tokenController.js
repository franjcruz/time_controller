import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as tokenService from '../services/tokenService';
import { isActive, isAdmin } from '../validators/userValidator';
import { loginValidator, refreshValidator } from '../validators/tokenValidator';
import passport from 'passport';
import passportMiddleware from './../middlewares/passport';

passportMiddleware(passport);

const router = Router();

/**
 * POST /api/token
 */
router.post('/', loginValidator, (req, res, next) => {
  tokenService
    .login(req.body.email, req.body.password)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/token/refresh
 */
router.post('/refresh', refreshValidator, (req, res, next) => {
  tokenService
    .refresh(req.body.refreshToken)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/token/:token
 */
router.delete('/:token', passport.authenticate('jwt', { session: false }), isActive, isAdmin, (req, res, next) => {
  tokenService
    .deleteToken(req.params.token)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
