import mysql from 'mysql2/promise'
import 'dotenv/config'

// String de conexão com banco de dados
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