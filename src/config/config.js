require('../env');

let CONFIG = {};

// CONSTANTS

// ENV VARIABLES
// Application
CONFIG.app_name = process.env.APP_NAME || 'Nexank Backend';
CONFIG.app_version = process.env.APP_VERSION || '1.0.0';
CONFIG.app_port = process.env.APP_PORT || '6002';
CONFIG.app_host = process.env.APP_HOST || '0.0.0.0';

// Database
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_host = process.env.DB_HOST || 'db';
CONFIG.db_name = process.env.DB_NAME || 'api';
CONFIG.db_user = process.env.DB_USER || 'api';
CONFIG.db_password = process.env.DB_PASSWORD || 'api';

// Log
CONFIG.logging_dir = process.env.LOGGING_DIR || 'logs';
CONFIG.logging_level = process.env.LOGGING_LEVEL || 'debug';

// Test Environment
CONFIG.test_app_port = process.env.TEST_APP_PORT || '9949';
CONFIG.test_db_name = process.env.TEST_DB_NAME || 'express_test';

// JWT
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'mysecret';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '3600';
CONFIG.jwt_refresh_expiration = process.env.JWT_REFRESH_EXPIRATION || '1296000';

// Mail
CONFIG.mail_host = process.env.MAIL_HOST || 'smtp.mailtrap.io';
CONFIG.mail_port = process.env.MAIL_PORT || '2525';
CONFIG.mail_user = process.env.MAIL_USER || '8945a5925d41af';
CONFIG.mail_pass = process.env.MAIL_PASS || '3cf88a68b67e0e';

// Secret for generate verify token
CONFIG.token_secret = process.env.TOKEN_SECRET || 'm4x_S3cr3t';

module.exports = CONFIG;
