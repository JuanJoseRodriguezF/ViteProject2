import { Link } from "react-router-dom";
import React from "react";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

export default function DefaultLayout({children}: DefaultLayoutProps) {
    return (
      <>
        <header>
          <nav>
            <ul>
              <img src="../public/Logo-web.jpg" alt="a" />
              <h1 className="Titulo">
                TweetVerse
              </h1>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>{children}</main>
      </>
    );
}