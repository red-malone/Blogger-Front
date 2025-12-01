const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      // load .env; allow system env vars to override
      systemvars: true,
    }),
  ],
};
