const dotenv = require('dotenv');

dotenv.config({
  path: './.env'
});

module.exports = {
  orgCode: process.env.TALEO_COMPANYCODE,
  username: process.env.TALEO_USERNAME,
  password: process.env.TALEO_PASSWORD
};
