module.exports = {
  // database configuration
  client: {
    // host
    host: 'your_host',
    // port
    port: 'your_port/3306',
    // username
    user: 'your_user/root',
    // password
    password: 'your_password',
    // database
    database: 'vaccine',
  },
  // load into app, default is open
  app: true,
  // load into agent, default is close
  agent: false,
};