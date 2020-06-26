const { Pool } = require("pg")
// configuração de db
module.exports = new Pool({
    user: "postgres",
    password: "_43690",
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})