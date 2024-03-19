import { Api } from "../axios-config";


export const loginApi = async (email: string, password: string): Promise<string | Error> => {
    try{
        const { data } = await Api.post('/auth/login', {email, password});
        
        if(data)
            return data.access_token;
        else
            return new Error('Credenciais inválidas')

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Listing movies error.')
    }
};