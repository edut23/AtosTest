import { useState } from "react";
import { Api } from "../axios-config";
//import axios from "axios";
//import MockAdapter from "axios-mock-adapter";

interface Products{
    id: number,
    name: string,
    price: number,
    supplier: string,
    barcode: number,
}

interface Item{
    id: number,
    user: string,
    password: string,
    name: string,
    cpf: string,
    birth: string,
    products: Products[],
}


export const loginApi = async (username: string, password: string): Promise<Item | Error> => {
    try{
        const { data } = await Api.get('/user');

        let token: boolean = false;
        let user: Item = {
            id: 0,
            user: '',
            password: '',
            name: '',
            cpf: '',
            birth: '',
            products: [],
        };

        data.map((item: Item) => {
            if(item.user === username && item.password === password){
                token = true;
                user= item;
            }
            return null;
        })
        
        if(token)
            return user;
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