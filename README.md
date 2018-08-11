# vaccine-back

According to the paper *Optimization of vaccinationcenter scheduling and algorithm implementation*, the 0-1 integer programming model of vaccination scheduling problem was established in order to minimize the fluctuation of the number of species in a single day in order to minimize the fluctuation of the number of species in a single day. This project implements the back end of the data generation website. You can use this part of the code to implement the backend interface, and a selectable rendering service. We do not recommend that you use this part of the rendering service. But if you don't know how to deploy the front and back separately, you can use it. You can maintain vaccine information in the simulation system and get the *data.json* file.

## How to use

This project needs to install some dependency libraries.

```
npm install
```

The developer has exported the structure of the database to a sql file, you can import it directly.

```
mysql -h localhost -u username -p password
create database vaccine;
use vaccine;
source ./path/to/database.sql
```

You need to configure the account password and other information of the database connection in the application.

```
# config.mysql.js
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
```

The service can be turned on, and the service has the function of rendering the page by default.

```
npm start
```

Since the default is to start the service on port 80, you need root privileges.

```
sudo npm start
sudo npm run dev # for development
```

If you want to change the front page, then you need to recompile the front end project and paste the contents of the dist folder into `app/view`  and `app/public/static`  path.

## How to develop

You can open a hot update service.

```
npm run dev
```

You can also tests.

```
npm test
```

## Contribution

Thank you to all the people who already contributed to this project!

- Yanchun Pan
- Zhi Zhang

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Zhi (Geovanni) Zhang