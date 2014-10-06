var exports = module.exports = {
  PORT: process.env.PORT || 8080,
  IP: process.env.BIND_IP || '0.0.0.0',
  HOSTNAME: process.env.OPENSHIFT_APP_DNS || 'localhost',
  APP_NAME: process.env.OPENSHIFT_APP_NAME || 'APP_NAME'
}
