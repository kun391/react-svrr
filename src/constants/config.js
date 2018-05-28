'use strict';

const env = process.env.NODE_ENV && ['production', 'staging', 'release', 'development'].indexOf(process.env.NODE_ENV) > -1 ? process.env.NODE_ENV : 'development';

module.exports = require(`./config.${env}`);
