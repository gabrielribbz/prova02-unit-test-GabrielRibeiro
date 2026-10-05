const pactum = require('pactum');

describe('Automação de API com PactumJS e Jest', () => {
  
  beforeAll(() => {
    pactum.request.setBaseUrl('https://reqres.in/api');
  });

  it('Cenário 1: Deve listar usuários com sucesso (GET)', async () => {
    await pactum.spec()
      .get('/users')
      .withQueryParams('page', 2)
      .expectStatus(200)
      .expectJsonLike({
        page: 2,
        data: []
      })
      .expectResponseTime(2000); 
  });

  it('Cenário 2: Deve criar um novo usuário (POST)', async () => {
    await pactum.spec()
      .post('/users')
      .withJson({
        name: 'João Silva',
        job: 'Desenvolvedor'
      })
      .expectStatus(201)
      .expectJsonLike({
        name: 'João Silva',
        job: 'Desenvolvedor'
      })
      .expectJsonSchema({
        type: 'object',
        properties: {
          id: { type: 'string' },
          createdAt: { type: 'string' }
        },
        required: ['id']
      });
  });

  it('Cenário 3: Deve atualizar os dados do usuário (PUT)', async () => {
    await pactum.spec()
      .put('/users/2')
      .withJson({
        name: 'João Silva Atualizado',
        job: 'Arquiteto de Software'
      })
      .expectStatus(200)
      .expectJsonLike({
        name: 'João Silva Atualizado',
        job: 'Arquiteto de Software'
      });
  });

  it('Cenário 4: Deve retornar erro 404 ao buscar usuário inexistente (GET Negativo)', async () => {
    await pactum.spec()
      .get('/users/9999') 
      .expectStatus(404)
      .expectJson({}); 
  });

  it('Cenário 5: Deve excluir um usuário com sucesso (DELETE)', async () => {
    await pactum.spec()
      .delete('/users/2')
      .expectStatus(204)
      .expectBody(''); 
  });
});