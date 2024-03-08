import { useState } from "react";
import { signUpAPI } from "../api/signUpAPI";

interface SignUpInfo{
    email: string,
    name: string,
    password: string,
}

const useSignUp = (setPage: React.Dispatch<React.SetStateAction<string>>, setAuth: React.Dispatch<React.SetStateAction<string>>) => {
    const [form, setForm] = useState<SignUpInfo>({
        email: '',
        name: '',
        password: '',
    })
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [error, setError] = useState<Partial<SignUpInfo>>({});

    const handleName = (value: string) =>{
        setForm({...form, name: value});
    }

    const handleUsername = (value: string) =>{
        setForm({...form, email: value});
    }

    const handlePassword = (value: string) =>{
        setForm({...form, password: value});
    }

    const handleConfirmPassword = (value: string) =>{
        setConfirmPassword(value);
        if(value === form.password)
            setConfirmError('');
        else{
            setConfirmError("Sua senha esta divergindo da confirmação");
        }
    }

    const validarCampos = () => {
        const novosErros: Partial<SignUpInfo> = {};
      
        if (form.name.trim() === '' && form.name.length < 5) {
          novosErros.name = 'Digite o seu nome completo';
        }
      
        if (form.password.trim() === '' && form.password.length < 6) {
            novosErros.password = 'Sua senha deve ter no minímo 6 caracteres';
        }
        
        if(confirmPassword !== form.password){
            setConfirmError("Sua senha esta divergindo da confirmação");
        }
      
        if (form.email.trim() === '' && form.email.length < 5) {
            novosErros.email = 'Seu nome de usuário deve ter no minímo 5 caracteres';
        }

        if (Object.keys(novosErros).length === 0) {
            return true;
        } else {
            setError(novosErros);
        
            return false
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(validarCampos())
            try {
                const info: SignUpInfo = {
                    email: form.email,
                    name: form.name,
                    password: form.password,
                }
                const data = await signUpAPI(info);
    
                if(data instanceof Error){
                    console.error("Erro ao cadastrar")
                }
                else{
                    console.log(data)
                    setAuth(data);
                }
            } 
            catch (error) {
                console.log('Credenciais inválidas');
            }
    };

    return{
        form,
        handleUsername,
        handlePassword,
        confirmPassword,
        handleConfirmPassword,
        confirmError,
        handleName,
        error,
        handleSubmit
    }
}

export default useSignUp;