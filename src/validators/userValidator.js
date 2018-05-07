import Joi from 'joi';
import validate from '../utils/validate';
import Boom from 'boom';
import logger from '../utils/logger';
import * as userService from '../services/userService';
import * as jwtService from '../services/jwtService';
import * as twofactorService from '../services/twofactorService';

const SCHEMA = {
  name: Joi.string()
    .label('name')
    .max(255)
    .optional(),
  surname: Joi.string()
    .label('surname')
    .max(255)
    .optional(),
  email: Joi.string()
    .email()
    .label('email')
    .max(255)
    .required(),
  password: Joi.string()
    .label('password')
    .min(6)
    .max(15)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s)(?=.*[^\da-zA-Z]).{6,15}$/, 'validate.password.length')
    .required(),
  phone: Joi.string()
    .label('phone')
    .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'string.phone.prefix')
    .required()
};

/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findUser(req, res, next) {
  let id;

  if (req.params.id) {
    id = req.params.id;
  } else {
    let jwtFromRequest = req.headers.authorization.split(' ')[1];
    let user = jwtService.decode(jwtFromRequest);
    id = user.id;
  }

  return userService
    .getUser(id)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate if email already exists.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findEmail(req, res, next) {
  return userService
    .emailAvailable(req.body.email)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate if user is active.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function isActive(req, res, next) {
  let jwtFromRequest = req.headers.authorization.split(' ')[1];
  let user = jwtService.decode(jwtFromRequest);

  return userService
    .isActive(user.id)
    .then(() => next())
    .catch(() => next(new Boom.forbidden('User not active')));
}

/**
 * Validate if new password given is valid.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function newPasswordValidator(req, res, next) {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s)(?=.*[^\da-zA-Z]).{6,15}$/;
  let data = req.body;

  if (data.passwordnew !== data.passwordnew2) {
    throw new Boom.badRequest('Error. Your password and confirmation password do not match', 'validate.password.match');
  }

  if (!data.passwordnew.match(regex)) {
    throw new Boom.badRequest('Error. Invalid new password: min 6 - max 15 character length, at least one uppercase letter, one lowercase letter, one number, one special character, space is not allowed', 'validate.password.length');
  }

  return next();
}

/**
 * Validate if password and 2fa given is correct.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function crendentialsValidator(req, res, next) {
  let jwtFromRequest = req.headers.authorization.split(' ')[1];
  let user = jwtService.decode(jwtFromRequest);

  return userService
    .validateCredentials(user.email, req.body.passwordold)
    .then(async () => {
      let tfa = await twofactorService.verify(req.headers.authorization, req.body);
      if (tfa) {
        next();
      }
    })
    .catch(err => next(err));
}

/** TODO
 * Validate if user is admin.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function isAdmin(req, res, next) {
  // let jwtFromRequest = req.headers.authorization.split(' ')[1];
  // let user = jwtService.decode(jwtFromRequest);
  // return userService
  //   .isActive(9999999)
  //   .then(() => next())
  //   .catch(err => next(err));

  logger.log(res);

  return false;
}

export { findUser, userValidator, findEmail, isActive, newPasswordValidator, crendentialsValidator, isAdmin };
