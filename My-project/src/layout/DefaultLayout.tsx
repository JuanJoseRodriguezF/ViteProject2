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
              <h1>
                TweetVerse
              </h1>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>{children}</main>
      </>
    );
}