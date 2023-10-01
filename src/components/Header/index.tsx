import { useState } from "react";
import { RiCloseFill, RiMenu2Fill } from "react-icons/ri";
import { CiGrid31, CiGrid2H, CiVault, CiUser, CiLogout } from "react-icons/ci";

import { Link } from "react-router-dom";

import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    async function handleLogout() {
        await signOut(auth);
    }
    
    return(

        <header 
            style={{ backgroundColor: "white" }} 
            className="w-full py-3 px-4 bg-white border-b border-sand flex rounded-full"
        >

            <nav className="w-full flex items-center justify-between rounded-md">
                <div className="hidden sm:flex gap-3 font-medium">
                    <Link to="/" className="flex items-center text-sm text-[#676b5f] group hover:text-[#292929]">
                        <span className="flex gap-1 items-center">
                        <CiGrid31 size={18} className="group-hover:text-[#292929] text-[#676b5f]" />
                        Home
                        </span>
                    </Link>
                    <Link to="/admin" className="flex items-center text-sm text-[#676b5f] group hover:text-[#292929] group">
                        <span className="flex gap-1 items-center">
                        <CiGrid2H size={18} className="group-hover:text-[#292929] text-[#676b5f]" />
                        Links
                        </span>
                    </Link>
                    <Link to="/admin/social" className="flex items-center text-sm text-[#676b5f] hover:text-[#292929] group">
                        <span className="flex gap-1 items-center">
                        <CiVault size={20} className="group-hover:text-[#292929] text-[#676b5f]" />
                        Redes sociais
                        </span>
                    </Link>
                    <Link to="/admin/profile" className="flex items-center text-sm text-[#676b5f] group hover:text-[#292929] ">
                        <span className="flex gap-1 items-center">
                        <CiUser size={20} className="group-hover:text-[#292929] text-[#676b5f]" />
                        Perfil
                        </span>
                    </Link>
                </div>

                {/* Ícone de hambúrguer para telas menores */}
                <div className="sm:hidden font-medium">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center justity-center">
                        <RiMenu2Fill size={18} className="group-hover:text-[#292929] text-[#676b5f]" />
                    </button>
                </div>
            
            
                {/* Menu de hambúrguer para telas menores */}
                {menuOpen && (

                    <div className="absolute top-0 left-0 lg:hidden h-screen w-full bg-white flex flex-col gap-8 items-center justify-center">

                        <button onClick={() => setMenuOpen(!menuOpen)} className="self-end me-10">
                            <RiCloseFill size={18} className="group-hover:text-[#292929] text-[#676b5f]"/>
                        </button>

                        <ul className="flex flex-col gap-5">
                            <li className="text-xl">
                                <Link to="/" className="flex items-center text-lg text-[#676b5f] group hover:text-[#292929] gap-2">
                                    <CiGrid31 size={18} className="group-hover:text-[#292929] text-[#676b5f]" />
                                    Home
                                </Link>
                            </li>
                            <li className="text-xl">
                                <Link to="/admin" className="flex items-center text-lg text-[#676b5f] group hover:text-[#292929] gap-2">
                                    <CiGrid2H size={18} className="group-hover:text-[#292929] text-[#676b5f]" />
                                    Links
                                </Link>
                            </li>
                            <li className="text-xl">
                                <Link to="/admin/social" className="flex items-center text-lg text-[#676b5f] group hover:text-[#292929] gap-2">
                                    <CiVault size={20} className="group-hover:text-[#292929] text-[#676b5f]" />
                                    Redes sociais
                                </Link>
                            </li>
                            <li className="text-xl">
                                <Link to="/admin/profile" className="flex items-center text-lg text-[#676b5f] group hover:text-[#292929] gap-2">
                                    <CiUser size={20} className="group-hover:text-[#292929] text-[#676b5f]" />
                                    Perfil
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>

      

            <button onClick={handleLogout} className="flex items-center text-sm text-[#676b5f] group hover:text-red-500">
                <span className="flex items-center gap-1">
                <CiLogout size={20} className="group-hover:text-red-500 text-[#676b5f]" />
                Sair
                </span>
            </button>

    </header>

    )
}