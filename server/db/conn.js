const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "A.thuong2002",
  database: "learnmysql",
  port: "3306",
});

conn.connect((error) => {
  if (error) throw error;
  console.log("connected !");
});

module.exports = conn;
