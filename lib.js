const postgres = require('postgres');

const sql = postgres(process.env.POSTGRES_URL ?? "", {
  ssl: {
    rejectUnauthorized: false
  },
});

module.exports = { sql };
