import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as userService from '../services/userService';
import { findUser, userValidator, findEmail, isActive } from '../validators/userValidator';
import passport from 'passport';
import passportMiddleware from './../middlewares/passport';

passportMiddleware(passport);

const router = Router();

/**
 * GET /api/users/me
 */
router.get('/me', passport.authenticate(['jwt-prelogin', 'jwt'], { session: false }), (req, res, next) => {
  userService
    .getMe(req.headers.authorization)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/users/me/status
 */
router.get('/me/status', passport.authenticate(['jwt-prelogin', 'jwt'], { session: false }), (req, res, next) => {
  userService
    .getMeStatus(req.headers.authorization)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/users
 */
router.post('/', userValidator, findEmail, (req, res, next) => {
  userService
    .createUser(req)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/users/me
 */
router.put('/me', passport.authenticate('jwt', { session: false }), isActive, findUser, (req, res, next) => {
  userService
    .updateUser(req.headers.authorization, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), isActive, findUser, (req, res, next) => {
  userService
    .deleteUser(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
