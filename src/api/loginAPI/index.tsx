import { Api } from "../axios-config";
//import axios from "axios";
//import MockAdapter from "axios-mock-adapter";

interface Products{
    id: number,
    name: string,
    price: number,
    supplier: string,
    barcode: number,
    userId: number
}

interface Item {
    id: number,
    user: string,
    password: string,
    products: Products[]
}

interface Data{
    id: number,
    products: Products[],
}


export const loginApi = async (username: string, password: string): Promise<number | Error> => {

    try{
        const { data } = await Api.get('/user');

        let token: boolean = false;
        let id: number = 0;

        data.map((item: Item) => {
            if(item.user === username && item.password === password){
                token = true;
                id = item.id;
            }
            return null;
        })
        
        if(token)
            return id;
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