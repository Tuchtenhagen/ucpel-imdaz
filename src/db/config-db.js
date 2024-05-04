import mysql from 'mysql2/promise'
import 'dotenv/config'

const connection = await mysql.createConnection({
  host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })

  export {
    connection
  }