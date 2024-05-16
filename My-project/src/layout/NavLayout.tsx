import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProv";
import React from "react";
import { API_URL } from "../auth/constants";

export default function NavLayout({children}: {children:React.ReactNode}){
    const auth = useAuth();

    async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>){
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/signout`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${auth.getRefreshToken()}`
                }
            });

            if(response.ok){
                auth.signOut();
            };
        } catch (error) {
            
        }
    }

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
                            <a href="#" onClick={handleSignOut}>
                                Sign out
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="home">{children}</main>
        </>
    );
};