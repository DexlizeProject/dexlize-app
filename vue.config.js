module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/tokens' : '/',
  devServer: {
    proxy: 'http://dicedapp.pub:8080'
  }
};

