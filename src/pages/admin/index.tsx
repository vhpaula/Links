import { FormEvent, useState, useEffect } from "react";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import iconWebsite from "../../assets/icons/website.svg";
import icon3D from "../../assets/icons/3D.svg";
import iconBooks from "../../assets/icons/books.svg";
import iconCart from "../../assets/icons/cart.svg";
import iconClock from "../../assets/icons/clock.svg";
import iconMail from "../../assets/icons/mail.svg";
import iconPen from "../../assets/icons/pen.svg";
import iconPencil from "../../assets/icons/pencil.svg";
import iconStore from "../../assets/icons/store.svg";
import arrow from "../../assets/icons/arrow.svg";

import { CiTrash } from "react-icons/ci";
import { db } from "../../services/firebaseConnection";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";

interface LinkProps {
    id: string;
    name: string;
    url: string;
    iconLink: any;
}

export function Admin() {
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [iconLink, setIconLink] = useState(iconWebsite)

    const [links, setLinks] = useState<LinkProps[]>([])

    useEffect(() => {

        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinkProps[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    iconLink: doc.data().iconLink
                })
            })

            setLinks(lista);
        })

        return () => {
            unsub();
        }

    }, [])

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if(nameInput === "" || urlInput === "") {
            alert("Preencher todos os campos")
            return;
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            iconLink: iconLink,
            created: new Date()
        })
        .then(() => {
            setNameInput("")
            setUrlInput("")
            setIconLink(iconWebsite)
            console.log('✅ CADASTRADO COM SUCESSO!')
        })
        .catch((error) => {
            console.log('🔴 ERRO AO CADASTRAR NO BANCO' + error)
        })
    }

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, "links", id)

        await deleteDoc(docRef)
    }

    function handleIconSelect(icon:string) { setIconLink(icon) }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 p-2">

            <Header />
            <h2 className="uppercase mt-8 mb-2 font-medium tracking-widest">Criar novo link</h2>

            <div className="flex flex-col gap-2 p-4 max-w-xl w-full bg-white rounded-3xl">
                <form className="flex flex-col w-full max-w-xl px-2 pt-4" onSubmit={handleRegister}>

                    {/* <label className="text-[#292929] font-medium mt-2 mb-2">Nome do link</label> */}
                    <Input 
                        placeholder="Digite o nome do link..." 
                        value={nameInput} 
                        onChange={ (e) => setNameInput(e.target.value) } 
                    />

                    {/* <label className="text-[#292929] font-medium mt-2 mb-2">Url do link</label> */}
                    <Input 
                        type="url" 
                        placeholder="Digite a url..." 
                        value={urlInput} 
                        onChange={ (e) => setUrlInput(e.target.value) } 
                    />

                    <label className="text-[#292929] font-medium mt-2 mb-2">Selecione um Ícones para o seu link:</label>
                    <div>
                        <ul className="flex flex-wrap items-center justify-center">
                            <li onClick={() => handleIconSelect(iconWebsite)}> <img src={iconWebsite} className="ransition-transform hover:scale-105 cursor-pointer" /> </li>
                            <li onClick={() => handleIconSelect(icon3D)}> <img src={icon3D} className="ransition-transform hover:scale-105 cursor-pointer" /> </li>
                            <li onClick={() => handleIconSelect(iconBooks)}> <img src={iconBooks} className="ransition-transform hover:scale-105 cursor-pointer" /> </li>
                            <li onClick={() => handleIconSelect(iconCart)}> <img src={iconCart} className="ransition-transform hover:scale-105 cursor-pointer" /> </li>
                            <li onClick={() => handleIconSelect(iconClock)}> <img src={iconClock} className="ransition-transform hover:scale-105 cursor-pointer" /> </li>
                            <li onClick={() => handleIconSelect(iconMail)}> <img src={iconMail} className="ransition-transform hover:scale-105 cursor-pointer" /> </li>
                            <li onClick={() => handleIconSelect(iconPen)}> <img src={iconPen} className="ransition-transform hover:scale-105 cursor-pointer" /> </li>
                            <li onClick={() => handleIconSelect(iconPencil)}> <img src={iconPencil} className="ransition-transform hover:scale-105 cursor-pointer" /> </li>
                            <li onClick={() => handleIconSelect(iconStore)}> <img src={iconStore} className="ransition-transform hover:scale-105 cursor-pointer" /> </li>
                        </ul>
                    </div>

                    <button type="submit" style={{ borderRadius: '48px', alignSelf: 'center' }} className="mb-3 mt-6 bg-green-400 w-28 h-9 rounded-md text-white font-medium gap-4 flex items-center justify-center items-se transition-transform hover:scale-105 hover:bg-green-500">
                        Cadastrar
                    </button>

                    { nameInput !== '' && (
                        <>
                        
                        <hr className="w-full border-1 border-solid border-[#292929] mt-6" />
                        
                        <div
                            className="flex items-center justify-start flex-col mb-1 p-1 border-gray-100/25 border rounded-md"
                        >
                            <label className="text-[#292929] font-medium mt-4 mb-3 uppercase">Veja como esta ficando:</label>

                            <section
                                style={{ backgroundColor: 'transparent', borderRadius: '48px' }}
                                className="mb-2 w-full h-12 py-4 px-3 border border-solid border-[#292929] select-none transition-transform hover:scale-105 cursor-pointer text-left flex items-center"
                            >
                                <a target="_blank" className="flex justify-between items-center">

                                    <p className="text-base text-[#292929] md:text-lg flex items-center font-semibold" style={{ color: '#292929' }}>
                                        <img src={iconLink} className="me-2" />

                                        {nameInput}
                                    </p>

                                </a>

                                <img src={arrow} className="ms-auto" />

                            </section>
                        
                        </div>

                        <hr className="w-full border-1 border-solid border-[#292929] mb-8" />
                        
                        </>
                    )}
                </form>
            </div>

            <h2 className="text-[#292929] font-medium mt-8 mb-3 uppercase">Meus links cadastrados</h2>

            <div className="flex flex-col gap-2 p-4 pt-8 max-w-xl w-full bg-white rounded-3xl">
                { links.map( (link) => (
                    <article 
                        key={link.id}
                        style={{ backgroundColor: 'transparent', borderRadius: '48px' }}
                        className="mb-4 h-14 py-4 px-3 border border-solid border-[#292929] select-none text-left flex items-center w-full max-w-xl justify-between"
                    >
                        <img src={link.iconLink} className="me-2" />

                        <p className="text-base md:text-lg flex flex-col items-center font-semibold">
                            {link.name}
                            <span className="text-sm"> 
                                {link.url} 
                            </span>
                        </p>


                        <button
                            className="border border-dashed p-1 border-[#db2629] rounded-full transition-transform hover:scale-105 hover:bg-red-200"
                            onClick={ () => handleDeleteLink(link.id) }
                        >
                            <CiTrash size={18} color="#db2629" />
                        </button>

                    </article>
                ))}
            </div>
        </div>
    )
}