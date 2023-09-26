import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../components/Input";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if(email === '' || password === ''){
            alert("Preencha todos os campos!")
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("✅ LOGADO COM SUCESSO!");
            navigate("/admin", { replace: true })
        })
        .catch((error) => {
            console.log("🔴 ERRO AO FAZER O LOGIN!");
            console.log(error);
        })
    }

    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
            <h1 className="md:text-4xl text-2xl font-bold text-dark mt-4">Links<span className="md:text-5xl text-green-400 text-3xl">.</span></h1>
            </Link>
            <span className="text-dark mt-4 mb-12 text-center font-medium text-md md:text-xl max-w">Faça seu login e começa a compartilhar seus links</span>
            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-4">
                <Input 
                    placeholder="Digite seu e-mail..."
                    type="email"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                />

                <Input 
                    placeholder="*************"
                    type="password"
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                />
                
                <button type="submit" style={{ borderRadius: '48px', alignSelf: 'center' }} className="mt-4 mb-7 bg-green-400 w-28 h-9 rounded-md text-white font-medium gap-4 flex items-center justify-center items-se transition-transform hover:scale-105 hover:bg-green-500">
                Acessar
                </button>
            </form>
        </div>
    )
}