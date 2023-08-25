var createConnection = require("typeorm").createConnection;

var connection = createConnection({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + "/../entities/*.ts"],
  migrations: [__dirname + "/migrations/*.ts"],
  synchronize: true,
  logging: true,
});

module.exports = connection;
