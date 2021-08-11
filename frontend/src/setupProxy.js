const proxy = require('http-proxy-middleware');

const apiProxy = proxy('/api', {
  target: 'http://localhost:5000',
  logLevel: 'debug',
  changeOrigin: true,
  pathRewrite: function (path, req) {
    return req.originalUrl.replace('/api/', '/');
  }
})

const oauth2Proxy = proxy('/auth/**', {
  target: 'http://localhost:5000',
  logLevel: 'debug',
  changeOrigin: true,
})

module.exports = function (app) {
  app.use(apiProxy, oauth2Proxy);
};
