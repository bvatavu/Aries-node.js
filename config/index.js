'use strict'

const ENV = process.env.NODE_ENV || 'development';
const config = require(`./enviroment/${ENV}`);

module.exports=config