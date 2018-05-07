import Boom from 'boom';
import User from '../models/user';
import * as bcrypt from 'bcryptjs';
// import logger from '../utils/logger';
import { decode } from '../services/jwtService';

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found', 'error.user.found');
    }

    return user;
  });
}

/**
 * Get user info from token owner
 *
 * @param  {String}  token
 * @return {Promise}
 *
 */
export function getMe(token) {
  let jwtFromRequest = token.split(' ')[1];
  let user = decode(jwtFromRequest);

  return getUser(user.id);
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createUser(req) {
  let user = req.body;

  return bcrypt.hash(user.password, bcrypt.genSaltSync(10)).then(function(hash) {
    user.password = hash;

    return new User({
      email: user.email,
      password: user.password,
      phone: user.phone
    })
      .save()
      .then(user => {
        return user.refresh();
      });
  });
}

/**
 * Update user (token owner)
 *
 * @param  {String}  token
 * @param  {Object}  user
 * @return {Promise}
 */
export function updateUser(token, user) {
  let jwtFromRequest = token.split(' ')[1];
  let owner = decode(jwtFromRequest);
  let id = owner.id;

  return new User({ id })
    .save({
      name: user.name,
      surname: user.surname
    })
    .then(user => user.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}

/**
 * Validate user credentials.
 *
 * @param  {String}  email
 * @param  {String}  password
 * @return {Promise}
 */
export function validateCredentials(email, password) {
  return new User({ email }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found', 'error.user.found');
    }

    if (!bcrypt.compareSync(password, user.attributes.password)) {
      throw new Boom.badRequest('Invalid password', 'validate.password.invalid_password');
    }

    return user;
  });
}

/**
 * Validate if an email exists already.
 *
 * @param  {String}  email
 * @param  {String}  password
 * @return {Boolean}
 */
export function emailAvailable(email) {
  return new User({ email }).fetch().then(user => {
    if (user) {
      throw new Boom.badRequest('Email already taken', 'validate.email.already');
    }

    return true;
  });
}
