export const routes = async (app) => {
  app.get('/users', async (req, reply) => {
    try {
      // Realizar a consulta SQL
      await app.mysql.query(
        'SELECT rg, nome FROM cadastroGeral WHERE id=?',
        [1], // Array de parâmetros
        async function  onResult (err, result) {
          console.log(result)

          if (err) {
            // Se houver um erro, enviar uma resposta com o erro
            reply.status(500).send(err);
            return;
          }

          // Se a consulta for bem-sucedida, enviar os resultados como resposta
          reply.send(result);
        }
      );
    } catch (err) {
      // Se ocorrer um erro durante a execução da rota, enviar uma resposta com o erro
      reply.status(500).send(err);
    }
  });
};