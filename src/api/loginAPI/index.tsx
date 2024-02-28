import { Api } from "../axios-config";
//import axios from "axios";
//import MockAdapter from "axios-mock-adapter";

interface Item {
    user: string,
    password: string,
}

export const loginApi = async (username: string, password: string): Promise<boolean | Error> => {

    try{
        const { data } = await Api.get('/user');

        let token = false;

        data.map((item: Item) => {
            if(item.user === username && item.password === password)
                token = true;
            return null;
        })
        
        if(token)
            return token;
        else
            return new Error('Credenciais inválidas')

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Listing movies error.')
    }
};

/*describe('Login', () => {
    it('should successfully log in and return token', async () => {
      // Criar uma instância do mock adapter
      const mock = new MockAdapter(axios);
  
      // Definir a resposta do mock para a rota de login
      const mockToken = 'mocked_token';
      mock.onPost('/user').reply(200, { token: mockToken });
  
      // Chamar a função de login
      const token = await loginApi('username', 'password');
  
      // Verificar se a função de login retornou o token esperado
      expect(token).toEqual(mockToken);
    });
  });*/