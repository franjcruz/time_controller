// import Boom from 'boom';
import { validateCredentials } from './userService';
// import User from '../models/user';
import * as jwt from './jwtService';

/**
 * Token request.
 *
 * @param  {String}  email
 * @param  {String}  password
 * @param  {String}  deviceId
 * @return {Promise}
 */
export function login(email, password, deviceId) {
  return validateCredentials(email, password).then(user => {
    return jwt.generate(user.attributes, false, false, deviceId);
  });
}

/**
 * Refresh token.
 *
 *
 * @param  {String}  token
 * @return {Promise}
 */
// export function refresh(token) {
//   return new Promise((resolve, reject) => {
//     return redisClient.get(token, (err, val) => {
//       let email = val;

//       return new User({ email }).fetch().then(user => {
//         if (user) {
//           let newToken = jwt.generate(user.attributes, true, false);

//           return resolve(newToken);
//         } else {
//           return reject(new Boom.unauthorized('Token invalid', 'error.token.invalid'));
//         }
//       });
//     });
//   });
// }

/**
 * Delete saved token.
 *
 *
 * @param  {String}  token
 * @return {Promise}
 */
// export function deleteToken(token) {
//   return new Promise((resolve, reject) => {
//     redisClient.del(token, (err, res) => {
//       if (res === 1) {
//         return resolve(res);
//       } else {
//         return reject(new Boom.notFound('Token not found'));
//       }
//     });
//   });
// }

/**
 * Get token from Redis.
 *
 *
 * @param  {String|Number}  id
 * @return {Boolean}
 */
// export function getTokenFromRedis(id) {
//   return new Promise((resolve, reject) => {
//     return redisClient.get(id, (err, val) => {
//       if (val) {
//         return resolve(true);
//       } else {
//         return reject(false);
//       }
//     });
//   });
// }
