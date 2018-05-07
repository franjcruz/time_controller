import { Strategy, ExtractJwt } from 'passport-jwt';
import { getTokenFromRedis } from '../services/tokenService';
import logger from '../utils/logger';
import CONFIG from '../config/config';

const secret = CONFIG.jwt_encryption;

export default function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secret;
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      if (jwtPayload.tfa) {
        return getTokenFromRedis(jwtPayload.id)
          .then(user => {
            if (user) {
              done(null, user);
            } else {
              done(null, false);
            }
          })
          .catch(err => {
            logger.info(err);
            done(null, false);
          });
      } else {
        done(null, false);
      }
    })
  );
}
