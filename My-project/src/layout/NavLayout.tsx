import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProv";
import React from "react";

export default function NavLayout({children}: {children:React.ReactNode}){
    const auth = useAuth();


    return(
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/search">Search</Link>
                        </li>
                        <li>
                            <Link to="/profile">{auth.getUser()?.username ?? ""}</Link>
                        </li>
                        <li>
                            <button className="logout" onClick={auth.signOut}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="home">{children}</main>
        </>
    );
};