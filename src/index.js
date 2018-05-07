import './env';
import './db';
import CONFIG from './config/config';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import routes from './routes/routes';
import logger from './utils/logger';
import bodyParser from 'body-parser';
import compression from 'compression';
import * as errorHandler from './middlewares/errorHandler';

const app = express();
const APP_PORT = (CONFIG.node_env === 'test' ? CONFIG.test_app_port : CONFIG.app_port) || CONFIG.port || '3000';
const APP_HOST = CONFIG.app_host || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = CONFIG.app_name;
app.locals.version = CONFIG.app_version;

app.use(cors());

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// app.use(helmet());

app.use(
  helmet({
    frameguard: false
  })
);

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler.bodyParser);

// Everything in the public folder is served as static content
app.use(express.static(path.join(__dirname, '/../public')));

// API Routes
app.use('/api', routes);

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get('port'), app.get('host'), () => {
  logger.log('info', `Server started at http://${app.get('host')}:${app.get('port')}`);
});

export default app;
