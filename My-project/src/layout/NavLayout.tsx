import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProv";
import React from "react";


export default function NavLayout({children}: {children:React.ReactNode}){
    const auth = useAuth();


    return(
        <>
            <header className="fixed-top">
                <nav>
                    <ul>
                        <img src="/assets/image/Logo-web.jpg" alt="a" />
                        <h1 className="Titulo">
                            TweetVerse
                        </h1>
                        <li>
                            <i className="fa-solid fa-house"></i>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                         <i className="fa-solid fa-magnifying-glass"></i>
                            <Link to="/search">Search</Link>
                        </li>
                        <li>
                            <i className="fa-solid fa-user"></i>
                            <Link to="/profile">{auth.getUser()?.username ?? ""}</Link>
                        </li>
                        <li>
                            <button className="logout" onClick={auth.signOut}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="home">{children}</main>
        </>
    );
};