// setting up the driver
const pg = require("pg");
const postgresUrl = "postgres://localhost/wnews";
const client = new pg.Client(postgresUrl);

// connecting to the 'postgres' server
client.connect();

// export
module.exports = client;
