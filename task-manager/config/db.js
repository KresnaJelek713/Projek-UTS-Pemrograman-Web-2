const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task_manager",
  password: "190303",
  port: 1903,
});

module.exports = pool;