import { updateAPI } from '.';
import { Api } from '../axios-config';
import MockAdapter from 'axios-mock-adapter';

// Criando uma instância do mock adapter, passando a instância do axios
const mock = new MockAdapter(Api);

describe('updateAPI', () => {
  afterEach(() => {
    mock.reset(); // Resetando o mock depois de cada teste
  });

  it('success PUT req', async () => {
    const id = 1;
    const product = {
      id: 1,
      user: 'testuser',
      password: 'testpassword',
      name: 'Test Name',
      cpf: '12345678910',
      birth: '01/01/2024',
      products: [
        {
          id: 1,
          name: 'Test Product',
          price: 10.99,
          supplier: 'Test Supplier',
          barcode: 123456789
        }
      ]
    };

    // Configurando o mock para simular uma resposta bem-sucedida
    mock.onPut(`/user/${id}`, product).reply(200, {});

    // Chamando a função a ser testada
    await expect(updateAPI(id, product)).resolves.toBeUndefined();

    // Verificando se a requisição foi chamada corretamente
    expect(mock.history.put.length).toBe(1);
    expect(mock.history.put[0].url).toBe(`/user/${id}`);
    expect(JSON.parse(mock.history.put[0].data)).toEqual(product);
  });
});