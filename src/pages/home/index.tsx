
import { useEffect, useState } from "react";
import { Social } from "../../components/Social";

import { FaFacebook, FaInstagram, FaYoutube, FaGithub, FaTwitter } from "react-icons/fa";

import { db } from "../../services/firebaseConnection";
import { getDocs, collection, query, orderBy, doc, getDoc } from "firebase/firestore";

import logoimg from "../../assets/images/user-avatar.svg";

import arrow from "../../assets/icons/arrow.svg";
import { Footer } from "../../components/Footer";

interface LinkProps {
    id: string;
    name: string;
    url: string;
    iconLink: any;
}

interface SocialLinksProps {
    facebook: string;
    instagram: string;
    youtube: string;
    github: string;
    twitter: string;
}

interface DataProfileProps {
    title: string;
    description: string;
}

export function Home() {
    const [links, setLinks] = useState<LinkProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()
    const [dataProfile, setDataProfile] = useState<DataProfileProps>()

    useEffect( () => {

        function loadDataProfile() {
            const docProfileRef = doc(db, "profile", "data")

            getDoc(docProfileRef)
            .then( (snapshot) => {

                if( snapshot.data() !== undefined ) {
                    setDataProfile({
                        title: snapshot.data()?.title,
                        description: snapshot.data()?.description,
                    })
                }
                
            })
            .catch( (error) => {
                console.log(error);
            }) 

        }

        loadDataProfile();

    }, [])

    useEffect( ( ) => {
        function loadLinks() {
            const linksRef = collection(db, "links")
            const queryRef = query(linksRef, orderBy("created", "asc"))

            getDocs(queryRef)
            .then( (snapshot) => {
                let lista = [] as LinkProps[];

                snapshot.forEach( (doc) => {
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        iconLink: doc.data().iconLink
                    })
                })

                setLinks(lista);
            })
            .catch( (error) => {
                console.log(error);
            })          

        }

        loadLinks();
    }, [])


    useEffect( ( ) => {

        function loadSocialLinks() {
            const docRef = doc(db, "social", "link")

            getDoc(docRef)
            .then( (snapshot) => {

                if( snapshot.data() !== undefined ) {
                    setSocialLinks({
                        facebook: snapshot.data()?.facebook,
                        instagram: snapshot.data()?.instagram,
                        youtube: snapshot.data()?.youtube,
                        github: snapshot.data()?.github,
                        twitter: snapshot.data()?.twitter,
                    })
                }
                
            })
            .catch( (error) => {
                console.log(error);
            })          

        }

        loadSocialLinks();
    }, [])


    return(
        <div className="flex flex-col w-full py-4 items-center min-h-screen">
            <img src={logoimg} alt="Avatar" className="mt-4" />
            <h1 className="md:text-4xl text-2xl font-bold text-dark mt-4">{dataProfile?.title}<span className="md:text-5xl text-green-400 text-3xl">.</span></h1>
            <span className="text-dark my-4 text-center font-medium text-md md:text-xl max-w-md">
                {dataProfile?.description}
            </span>

            { socialLinks && Object.keys(socialLinks).length > 0 && (
                <section className="flex justify-center gap-3">
                    { socialLinks?.facebook !== '' && (
                        <Social url={socialLinks?.facebook}>
                            <FaFacebook size={21} color="#292929" />
                        </Social>
                    )}

                    { socialLinks?.youtube !== '' && (
                        <Social url={socialLinks?.youtube}>
                            <FaYoutube size={21} color="#292929" />
                        </Social>
                    )}

                    { socialLinks?.instagram !== '' && (
                        <Social url={socialLinks?.instagram}>
                            <FaInstagram size={21} color="#292929" />
                        </Social>
                    )}
                    
                    { socialLinks?.github !== '' && (
                        <Social url={socialLinks?.github}>
                            <FaGithub size={21} color="#292929" />
                        </Social>
                    )}

                    { socialLinks?.twitter !== '' && (
                        <Social url={socialLinks?.twitter}>
                            <FaTwitter size={21} color="#292929" />
                        </Social>
                    )}
                </section> 
            )}

            <main className="flex flex-col w-11/12 max-w-2xl text-center mb-8">
                <h2 className="uppercase mt-8 mb-4 font-medium tracking-widest">Links destacados</h2>
                { links.map( (link) => (
                    <section 
                        style={{ backgroundColor: 'transparent', borderRadius: '48px' }}
                        key={link.id}
                        className="mb-4 w-full h-16 py-4 px-3 border border-solid border-[#292929] select-none transition-transform hover:scale-105 cursor-pointer text-left flex items-center"
                    >
                        <a href={link.url} target="_blank" className="flex justify-between items-center">
                            
                            <p className="text-base md:text-lg flex items-center font-semibold" style={{ color: '#292929' }}>
                                <img src={link.iconLink} className="me-2" />
                                {link.name}
                            </p>

                        </a>    

                        <img src={arrow} className="ms-auto" />
                    </section>
                ))}
            </main>

            <Footer />
        </div>
    )
}