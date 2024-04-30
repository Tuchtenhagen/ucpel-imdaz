import mysql from 'mysql';
import Postgrator from 'postgrator';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrate() {
  const client = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    await client.connect();

    console.log(join(__dirname, '../migrations/*'));

    const postgrator = new Postgrator({
      migrationPattern: join(__dirname, '../migrations/*'),
      driver: 'mysql',
      database: 'imdaz',
      schemaTable: 'migrations',
      execQuery: (query) => client.query(query),
      // Remove a configuração execQuery para evitar o erro
    });

    const migrations = await postgrator.migrate();
    if (!migrations || migrations.length === 0) {
      console.log('Nenhuma migração foi aplicada ou já está atualizada.');
    } else {
      console.log('Migração concluída.');
    }

    console.log('Migration done.');
    process.exitCode = 0;
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

migrate();