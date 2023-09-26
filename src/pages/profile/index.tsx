import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import logoimg from "../../assets/images/user-avatar.svg";
import { FormEvent, useEffect, useState } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";


export function Profile() {
    const [inputTitle, setInputTitle] = useState('');
    const [textarea, setTextarea] = useState('');

    const maxLengthTextArea = 200; // Defina o limite máximo de caracteres desejado

    useEffect( () => {

        function loadDataProfile() {
            const docRef = doc(db, "profile", "data")

            getDoc(docRef)
            .then( (snapshot) => {
                if(snapshot.data() !== undefined ){
                    setInputTitle(snapshot.data()?.title)
                    setTextarea(snapshot.data()?.description)
                }
            })

        }

        loadDataProfile();

    }, [])

    const handleChange = (event:any) => {
        const inputText = event.target.value;

        if (inputText.length <= maxLengthTextArea) {
            setTextarea(inputText);
        }
    };

    function handleRegister( e: FormEvent ) {
        e.preventDefault();

        setDoc( doc(db, "profile", "data"), {
            title: inputTitle,
            description: textarea
        })
        .then( () => {
            console.log("✅ CADASTRADO COM SUCESSO!")
        })
        .catch( (error) => {
            console.log("ERRO AO SALVAR" + error)
        } )
    }


    return(
        
        <div className="flex items-center flex-col min-h-screen pb-7 p-2">
            <Header />

            <h2 className="text-[#292929] text-xl font-medium mt-6 mb-6 uppercase">Perfil</h2>

            <div className="flex flex-col gap-2 p-4 max-w-xl w-full bg-white rounded-3xl">
                <div style={{ alignSelf: 'center' }} className="my-4">
                    <img src={logoimg} alt="Avatar" />
                </div>
                <form onSubmit={ handleRegister }>
                    <label className="text-[#292929] font-medium mt-2 uppercase flex gap-2 items-center ms-4  mb-1">
                        Titulo do perfil
                    </label>
                    <Input 
                        type="text"
                        placeholder="Digite o título do perfil..."
                        value={inputTitle}
                        onChange={ (e) => setInputTitle(e.target.value) }
                        style={{ paddingLeft: 26, borderRadius:46 }}
                    />

                    <label className="text-[#292929] font-medium mt-8 uppercase flex gap-2 items-center ms-4  mb-1">
                        Descrição do perfil
                    </label>
                    <textarea 
                        value={textarea}
                        onChange={handleChange}
                        placeholder="Digite a descrição do perfil..."
                        style={{ backgroundColor: 'transparent', borderRadius: '28px' }}
                        className="text-base text-[#292929] md:text-md flex items-center font-semibold mb-2 w-full h-44 px-6 py-4 border border-solid border-[#292929] cursor-pointer text-left flex items-center"
                    >{textarea}</textarea>
                    <p className="text-end font-medium text-sm">
                        {textarea.length}/{maxLengthTextArea}
                    </p>
                    <button 
                        type="submit"
                        style={{ borderRadius: '48px', alignSelf: 'center' }} className="mb-7 bg-green-400 w-28 h-9 rounded-md text-white font-medium gap-4 flex items-center justify-center items-se transition-transform hover:scale-105 hover:bg-green-500 ms-auto me-auto"
                    >
                        Salvar
                    </button>
                </form>
            </div>

        </div>

    )
}