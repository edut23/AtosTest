import { useState } from "react";
import { signUpAPI } from "../api/signUpAPI";

interface SignUpInfo{
    user: string,
    password: string,
    name: string,
    cpf: string,
    birth: string,
    products: [],
}

const useSignUp = (setPage: React.Dispatch<React.SetStateAction<string>>) => {
    const [form, setForm] = useState<SignUpInfo>({
        user: '',
        password: '',
        name: '',
        cpf: '',
        birth: '',
        products: [],
    })
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [error, setError] = useState<Partial<SignUpInfo>>({});

    const handleName = (value: string) =>{
        setForm({...form, name: value});
    }

    const handleUsername = (value: string) =>{
        setForm({...form, user: value});
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

    const handleBirth = (value: string) =>{
        setForm({...form, birth: value});
    }

    const cpfMask = (value: string) => {
        return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    }

    const handleCpf = (value: string) => {
        setForm({...form, cpf: cpfMask(value)});
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
      
        if (form.user.trim() === '' && form.user.length < 5) {
            novosErros.user = 'Seu nome de usuário deve ter no minímo 5 caracteres';
        }

        if (form.birth.trim() === '' && form.birth.length < 5) {
            novosErros.birth = 'Preencha sua data de nascimento';
        }

        if (form.cpf.trim() === '' && form.cpf.length !== 14){
            novosErros.cpf = 'Preencha seu CPF corretamente';
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
                    user: form.user,
                    password: form.password,
                    name: form.name,
                    cpf: form.cpf,
                    birth: form.birth,
                    products: []
                }
                const check = await signUpAPI(info);
    
                if(check)
                    setPage('login')
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
        handleCpf,
        handleBirth,
        error,
        handleSubmit
    }
}

export default useSignUp;