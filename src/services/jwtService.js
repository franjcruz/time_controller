import jwt from 'jsonwebtoken';
import moment from 'moment';
import CONFIG from '../config/config';

const secret = CONFIG.jwt_encryption;
const expi = CONFIG.jwt_expiration;
const expiRef = CONFIG.jwt_refresh_expiration;

/**
 * Generate a new JWT and save it in redis.
 *
 *
 * @param  {Object}   user
 * @param  {Boolean}  tfaStatus
 * @param  {Boolean}  refresh
 * @param  {String}   deviceId
 * @return {Object}
 */
export function generate(user, tfaStatus, refresh, deviceId) {
  let payload = {
    id: user.id,
    email: user.email,
    deviceId: deviceId,
    phone: user.phone,
    tfa: tfaStatus,
    iat: moment().unix(),
    exp: moment()
      .add(expi, 'seconds')
      .unix()
  };

  let token = jwt.sign(payload, secret);
  let refreshToken;
  if (refresh) {
    refreshToken = createRefreshToken();
  }

  let res = {
    access_token: token,
    expires_in: expi,
    token_type: 'Bearer',
    refresh_token: refreshToken
  };

  return res;
}

/**
 * Decode a JWT.
 *
 *
 * @param  {String}  token
 * @return {Object}
 */
export function decode(token) {
  return jwt.verify(token, secret);
}

/**
 * Create refresh token.
 *
 *
 * @param  {Object}  user
 * @return {String}
 */
export function createRefreshToken() {
  let refreshToken = jwt.sign(
    {
      type: 'refresh'
    },
    secret,
    {
      expiresIn: expiRef
    }
  );

  return refreshToken;
}
