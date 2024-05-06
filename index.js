import Fastify from 'fastify'
import fastifyMySQL from '@fastify/mysql'
import { AlunoRoutes } from './src/routes/alunos-routes.js'
import { MaeRoutes } from './src/routes/maes-routes.js'
import { AutorizadosAlunoRoutes } from './src/routes/autorizados-aluno-routes.js'
import { TurmaRoutes } from './src/routes/turmas-routes.js'
import 'dotenv/config'

const app = Fastify({
  logger: true
})

app.register(fastifyMySQL, {
  promise: true,
  connectionString: process.env.DB_URL
})
app.register(AlunoRoutes)
app.register(MaeRoutes)
app.register(AutorizadosAlunoRoutes)
app.register(TurmaRoutes)

const startServer = async () => {
  try {
      await app.listen({port: 3000});
      // app.log
      app.log.info('Servidor rodando em http://localhost:3000');
  } catch (err) {
    app.log.error('Erro ao iniciar o servidor:', err);
      process.exit(1);
  }
};

startServer();