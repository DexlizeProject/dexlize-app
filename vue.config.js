module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    proxy: 'http://dicedapp.pub:8080'
  }
};

