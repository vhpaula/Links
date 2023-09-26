import { FormEvent, useEffect, useState } from "react";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from 'firebase/firestore';

import { FaFacebook, FaInstagram, FaYoutube, FaGithub, FaTwitter } from "react-icons/fa";


export function Networks() {

    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [youtube, setYoutube] = useState("")
    const [github, setGithub] = useState("")
    const [twitter, setTwitter] = useState("")

    useEffect(() => {

        function loadLinks() {

            const docRef = doc(db, "social", "link")

            getDoc(docRef)
            .then( (snapshot) => {
                if(snapshot.data() !== undefined ){
                    setFacebook(snapshot.data()?.facebook)    
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube)
                    setGithub(snapshot.data()?.github)
                    setTwitter(snapshot.data()?.twitter)
                }
            })

        }

        loadLinks();

    }, [])

    function handleRegister( e: FormEvent ) {
        e.preventDefault();

        setDoc( doc(db, "social","link"), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube,
            github: github,
            twitter: twitter
        })
        .then( () => {
            console.log("CADASTRADO COM SUCESSO!")
        })
        .catch( (error) => {
            console.log("ERRO AO SALVAR" + error)
        })
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 p-2">
            <Header />

            <h1 className="text-[#292929] font-medium mt-6 mb-6 uppercase">Minhas redes sociais</h1>
            <div className="flex flex-col gap-2 p-4 max-w-xl w-full bg-white rounded-3xl">
                <form className="flex flex-col max-w-xl w-full" onSubmit={ handleRegister }>
                    <label className="text-[#292929] font-medium mt-2 uppercase flex gap-2 items-center ms-4 mb-1">
                        <FaFacebook size={21} color="#3b5998"/>
                        Facebook
                    </label>
                    <Input 
                        type="url"
                        placeholder="Digite a url do facebook..."
                        value={facebook}
                        onChange={ (e) => setFacebook(e.target.value) }
                    />

                    <label className="text-[#292929] font-medium mt-2 uppercase flex gap-2 items-center ms-4  mb-1">
                        <FaInstagram size={21} color="#f70101" />
                        Instagram
                    </label>
                    <Input 
                        type="url"
                        placeholder="Digite a url do instagram..."
                        value={instagram}
                        onChange={ (e) => setInstagram(e.target.value) }
                    />

                    <label className="text-[#292929] font-medium mt-2 uppercase flex gap-2 items-center ms-4  mb-1">
                        <FaYoutube size={21} color="#D14E53" />
                        Youtube
                    </label>
                    <Input 
                        type="url"
                        placeholder="Digite a url do youtube..."
                        value={youtube}
                        onChange={ (e) => setYoutube(e.target.value) }
                    />

                    <label className="text-[#292929] font-medium mt-2 uppercase flex gap-2 items-center ms-4  mb-1">
                        <FaGithub size={21} color="#171515" />
                        Github
                    </label>
                    <Input 
                        type="url"
                        placeholder="Digite a url do github..."
                        value={github}
                        onChange={ (e) => setGithub(e.target.value) }
                    />

                    <label className="text-[#292929] font-medium mt-2 uppercase flex gap-2 items-center ms-4  mb-1">
                        <FaTwitter size={21} color="#00acee" />
                        Twitter
                    </label>
                    <Input 
                        type="url"
                        placeholder="Digite a url do twitter..."
                        value={twitter}
                        onChange={ (e) => setTwitter(e.target.value) }
                    />

                    <button 
                        type="submit"
                        style={{ borderRadius: '48px', alignSelf: 'center' }} className="my-3 bg-green-400 w-28 h-9 rounded-md text-white font-medium gap-4 flex items-center justify-center items-se transition-transform hover:scale-105 hover:bg-green-500"
                    >
                        Salvar links
                    </button>
                </form>
            </div>

        </div>
    )
}